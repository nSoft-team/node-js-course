require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");

function getAllProductsAsync() {
  return ProductModel.find().exec();
}

function getOneProductAsync(_id) {
  return ProductModel.findById(_id).exec();
}

function addProductAsync(product) {
  return product.save();
}

function updateProductAsync(product) {
  return ProductModel.findByIdAndUpdate(product._id, product, {
    returnOriginal: false,
  }).exec();
}

function deleteProductAsync(_id) {
  return ProductModel.findByIdAndDelete(_id).exec();
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateProductAsync,
  deleteProductAsync,
};
