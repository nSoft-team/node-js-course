// Business Logic Layer.

const dal = require("../data-access-layer/dal");

// Get all products:
async function getAllProductsAsync() {
  const products = await dal.getAllProductsAsync();
  return products;
}

// Get one product:
async function getOneProductAsync(id) {
  const products = await dal.getAllProductsAsync();
  const product = products.find((p) => p.id === id); // Returns undefined if not found.
  return product;
}

// Add product:
async function addProductAsync(product) {
  const products = await dal.getAllProductsAsync();
  product.id = products[products.length - 1].id + 1; // Generate a new max id.
  products.push(product);
  return product;
}

// Update full product:
async function updateFullProductAsync(product) {
  const products = await dal.getAllProductsAsync();
  const index = products.findIndex((p) => p.id === product.id);
  if (index === -1) return null;
  products[index] = product;
  return product;
}

async function updatePartialProductAsync(product) {
  const productToUpdate = await getOneProductAsync(product.id);
  if (!productToUpdate) return null;
  for (const prop in product) {
    if (product[prop] !== undefined) {
      productToUpdate[prop] = product[prop];
    }
  }
  return productToUpdate;
}

// Delete product:
async function deleteProductAsync(id) {
  const products = await dal.getAllProductsAsync();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateFullProductAsync,
  updatePartialProductAsync,
  deleteProductAsync,
};
