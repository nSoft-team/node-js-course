const mongoose = require("mongoose");
require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");

// Get all products (SELECT * FROM products):
function getAllProductsAsync() {
  return ProductModel.find().exec();
}

// Get one product (SELECT * FROM products WHERE _id = ____):
function getOneProductAsync(_id) {
  return ProductModel.findById(_id).exec();
}

// Add product (INSERT INTO products VALUES(...)):
function addProductAsync(product) {
  return product.save();
}

// // Update product - first way (UPDATE products SET ... WHERE _id = ____):
// async function updateProductAsync(product) {
//     const info = await ProductModel.updateOne({ _id: product._id }, product).exec(); // ProductModel.updateOne({ _id: product._id }, { $set: { price: product.price, stock: product.stock } }).exec(); will update only those two properties.
//     return info.n ? product : null; // info.n === 0 means no product found to update. info.nModified === 0 means no product found to update or product found but not update cause there is no change to update.
// }

// Update product - second way (UPDATE products SET ... WHERE _id = ____):
function updateProductAsync(product) {
  return ProductModel.findByIdAndUpdate(product._id, product, {
    returnOriginal: false,
  }).exec(); // returnOriginal: false means return the updated product and not the original one before the update.
}

// // Delete product - first way (DELETE FROM products WHERE _id = ____):
// async function deleteProductAsync(_id) {
//     const info = await ProductModel.deleteOne({ _id }).exec();
//     return info.n > 0;
// }

// Delete product - second way (DELETE FROM products WHERE _id = ____):
function deleteProductAsync(_id) {
  return ProductModel.findByIdAndDelete(_id).exec();
}

// Additional Queries (Query Operators: $or, $gt, $gte, $lt, $lte, $eq, $ne, $in, $nin, $regex, ...)

// Get products with partial fields (SELECT ____, ____, ____ FROM products):
function getProductsPartialAsync() {
  return ProductModel.find({}, ["name", "price"]).exec(); // First way - returns _id, name, price
  // return ProductModel.find({}, { name: true, price: true, _id: false }).exec(); // Second way - returns name, price (without _id)
}

// Get products by price (SELECT * FROM products WHERE price = ____):
function getProductsByPriceAsync(price) {
  return ProductModel.find({ price }).exec();
}

// Get products by name AND price (SELECT * FROM products WHERE name = ____ AND price = ____):
function getProductsByNameAndPriceAsync(name, price) {
  return ProductModel.find({ name, price }).exec();
}

// Get products by name OR price (SELECT * FROM products WHERE name = ____ OR price = ____):
function getProductsByNameOrPriceAsync(name, price) {
  return ProductModel.find({ $or: [{ name }, { price }] }).exec();
}

// Get products by price range (SELECT * FROM products WHERE price >= ____ AND price <= ____):
function getProductsByPriceRangeAsync(minPrice, maxPrice) {
  return ProductModel.find({
    price: { $gte: minPrice, $lte: maxPrice },
  }).exec();
}

// Get sorted products (SELECT * FROM products ORDER BY price DESC, name ASC):
function getSortedProductsAsync() {
  return ProductModel.find({}, null, { sort: { price: -1, name: 1 } }).exec(); // null returns all props. ["name", "price"] returns only name and price, etc.
}

// Get paged products (SELECT * FROM products LIMIT ____, ____):
function getPagedProductsAsync(skip, limit) {
  return ProductModel.find({}, null, { skip, limit }).exec();
}

// Get products containing multiple words (SELECT * FROM products WHERE name LIKE '% %'):
function getMultipleWordsProductsAsync() {
  return ProductModel.find({ name: { $regex: /^.+ .+$/ } }).exec();
}

// Get all products, each including its category (SELECT P.*, C.* FROM products AS P JOIN categories AS C ON P.categoryId = C.categoryId):
function getProductsIncludingCategoryAsync() {
  return ProductModel.find().populate("category").exec(); // Returns a Promise.
}

// Get all categories, each including its products (SELECT C.*, P.* FROM categories AS C JOIN products AS P ON C.categoryId = P.categoryId):
function getCategoriesIncludingProductsAsync() {
  return CategoryModel.find().populate("products").exec();
}

// Swap prices between two products, using transaction:
// Note: Transaction works only on replicas (multiple mongo processes using the same data) which is not the case in this program, thus it's not working here and we're getting the error: "Transaction numbers are only allowed on a replica set member or mongos".
async function swapPricesAsync(_id1, _id2) {
  let session;
  try {
    // Start session and transaction (transaction is based on a session):
    session = await mongoose.startSession();
    session.startTransaction();

    // Each operation must get the session in order for it to be a part of the transaction, otherwise it will be performed only after the commit:
    const product1 = await ProductModel.findOne({ _id: _id1 })
      .session(session)
      .exec();
    const product2 = await ProductModel.findOne({ _id: _id2 })
      .session(session)
      .exec();
    if (!product1 || !product2) {
      return null;
    }
    const temp = product1.price;
    product1.price = product2.price;
    product2.price = temp;
    const updatedProduct1 = await ProductModel.updateOne(
      { _id: _id1 },
      product1
    )
      .session(session)
      .exec();
    // Math.PI.toFixed(-5); // Demo for some exception in between.
    const updatedProduct2 = await ProductModel.updateOne(
      { _id: _id2 },
      product2
    )
      .session(session)
      .exec();

    // Commit transaction:
    await session.commitTransaction();

    return { updatedProduct1, updatedProduct2 };
  } catch (err) {
    // Abort transaction:
    session.abortTransaction();

    throw err; // Throw error so it will catch in the controller level.
  } finally {
    session.endSession();
  }
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
  getProductsPartialAsync,
  getProductsByPriceAsync,
  getProductsByNameAndPriceAsync,
  getProductsByNameOrPriceAsync,
  getProductsByPriceRangeAsync,
  getSortedProductsAsync,
  getPagedProductsAsync,
  getMultipleWordsProductsAsync,
  getProductsIncludingCategoryAsync,
  getCategoriesIncludingProductsAsync,
  swapPricesAsync,
};
