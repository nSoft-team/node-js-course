import { OkPacket } from "mysql";
import { BAD_REQUEST } from "../01-utils/status-codes";
import ErrorModel from "../03-models/error-model";
import ProductModel from "../03-models/product-model";
import dal from "../04-dal/dal";

async function getAllProducts(): Promise<ProductModel[]> {
  const sql = `SELECT
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock,
                    CONCAT(ProductID, '.jpg') AS imageName 
                    FROM Products`;

  const products = await dal.execute(sql);
  return products;
}

async function getOneProduct(id: number): Promise<ProductModel> {
  const sql = `SELECT 
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock,
                    CONCAT(ProductID, '.jpg') AS imageName 
                    FROM Products
                    WHERE ProductID = ${id}`;

  const products = await dal.execute(sql);

  const product = products[0];

  if (!product) throw new ErrorModel(404, `id ${id} not found`);

  return product;
}

async function addProduct(product: ProductModel): Promise<ProductModel> {
  const errors = product.validatePost();
  if (errors) throw new ErrorModel(BAD_REQUEST, errors);
  // if (errors) throw new ErrorModel(StatusCode.BadRequest, errors);

  const sql = `INSERT INTO Products(ProductName, UnitPrice, UnitsInStock)
                 VALUES('${product.name}',${product.price},${product.stock})`;

  const info: OkPacket = await dal.execute(sql);
  product.id = info.insertId;

  return product;
}

async function updateFullProduct(product: ProductModel): Promise<ProductModel> {
  const errors = product.validatePut();
  if (errors) throw new ErrorModel(400, errors);

  const sql = `UPDATE Products SET
                 ProductName = '${product.name}',
                 UnitPrice = ${product.price},
                 UnitsInStock = ${product.stock}
                 WHERE ProductID = ${product.id}`;

  const info: OkPacket = await dal.execute(sql);

  if (info.affectedRows === 0)
    throw new ErrorModel(404, `id ${product.id} not found`);

  return product;
}

async function updatePartialProduct(
  product: ProductModel
): Promise<ProductModel> {
  const errors = product.validatePatch();
  if (errors) throw new ErrorModel(400, errors);

  const dbProduct = await getOneProduct(product.id);

  for (const prop in product) {
    if (product[prop] !== undefined) {
      dbProduct[prop] = product[prop];
    }
  }

  const updatedProduct = await updateFullProduct(new ProductModel(dbProduct));

  return updatedProduct;
}

async function deleteProduct(id: number): Promise<void> {
  const sql = `DELETE FROM Products WHERE ProductID = ${id}`;

  const info: OkPacket = await dal.execute(sql);

  if (info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateFullProduct,
  updatePartialProduct,
  deleteProduct,
};
