import { IProductModel, ProductModel } from "../03-models/product-model";
import ErrorModel from "../03-models/error-model";

// SELECT * FROM Products
async function getAllProducts(): Promise<IProductModel[]> {
  // Get all products without virtual fields:
  //return ProductModel.find().exec();

  // Get all products with virtual fields:
  return ProductModel.find().populate("category").exec();
}

// SELECT * FROM Products WHERE id = ___
async function getOneProduct(_id: string): Promise<IProductModel> {
  const product = await ProductModel.findById(_id).exec();
  if (!product) throw new ErrorModel(404, `_id ${_id} not found`);
  return product;
}

// INSERT INTO Products...
async function addProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ErrorModel(400, errors.message);
  return product.save();
}

// UPDATE Products SET...
async function updateProduct(product: IProductModel): Promise<IProductModel> {
  const errors = product.validateSync();
  if (errors) throw new ErrorModel(400, errors.message);

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product._id,
    product,
    { returnOriginal: false }
  ).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
  if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);

  return updatedProduct;
}

// DELETE FROM Products...
async function deleteProduct(_id: string): Promise<void> {
  const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
  if (!deletedProduct) throw new ErrorModel(404, `_id ${_id} not found`);
}

// --------------------------------------

// SELECT name, price FROM products
async function getPartialProducts(): Promise<IProductModel[]> {
  // return ProductModel.find({}, ["name", "price"]).exec(); // including _id
  return ProductModel.find({}, { name: true, price: true, _id: false }).exec(); // excluding _id
}

// SELECT ___ FROM products WHERE ____
async function getSomeProducts(): Promise<IProductModel[]> {
  // SELECT * FROM products WHERE price = 10
  // return ProductModel.find({ price: 10 }).exec();

  // SELECT * FROM products WHERE price = 10 AND name = 'Longlife Tofu'
  // return ProductModel.find({ price: 10, name: "Longlife Tofu" }).exec();

  // SELECT * FROM products WHERE price = 10 OR name = 'Chai'
  // return ProductModel.find({ $or: [{ price: 10 }, { name: "Chai" }] }).exec();

  // Mongo Query Operators: $or, $and, $gt, $gte, $lt, $lte, $eq, $ne...

  // SELECT * FROM products WHERE price BETWEEN 10 AND 20
  // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }).exec();

  // SELECT name, price FROM products WHERE price BETWEEN 10 AND 20
  // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, { name: true, price: true, _id: false }).exec();

  // SELECT * FROM products WHERE price BETWEEN 10 AND 20 ORDER BY price ASC
  // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, null, { sort: { price: 1 } }).exec();

  // SELECT * FROM products WHERE price BETWEEN 10 AND 20 ORDER BY price DESC
  // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, null, { sort: { price: -1 } }).exec();

  // SELECT * FROM products WHERE price BETWEEN 10 AND 20 ORDER BY price ASC name DESC
  // return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, null, { sort: { price: 1, name: -1 } }).exec();

  // Paging: SELECT * FROM products LIMIT 20, 7 --> skip 20, get 7
  // return ProductModel.find({}, null, { skip: 20, limit: 7 }).exec();

  // SELECT * FROM products WHERE name LIKE '% %'
  // return ProductModel.find({ name: { $regex: /^.+ .+$/ } }).exec();
  // return ProductModel.find({ name: { $regex: /^(\b\w+\b){2,}$/ } }).exec();

  // INNER JOIN - Get all products with category for each, don't get products without category
  return ProductModel.find({ categoryId: { $ne: null } })
    .populate("category")
    .exec();
}

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getPartialProducts,
  getSomeProducts,
};
