import ProductModel from "../03-models/product-model";
import dal from "../04-dal/dal";

async function getAllProducts(): Promise<ProductModel[]> {
  const sql = `SELECT
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock
                    FROM Products`;

  const products = await dal.execute(sql);
  return products;
}

async function getOneProduct(id: number): Promise<ProductModel> {
  const sql = `SELECT 
                    ProductID AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock
                    FROM Products
                    WHERE ProductID = ${id}`;
  const products = await dal.execute(sql);
  const product = products[0];
  return product;
}

export default {
  getAllProducts,
  getOneProduct,
};
