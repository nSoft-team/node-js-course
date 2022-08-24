const dal = require("../data-access-layer/dal");

// Get all products:
async function getAllProductsAsync() {
  const sql =
    "SELECT ProductID as id, ProductName as name, UnitPrice as price, UnitsInStock as stock FROM Products";
  const products = await dal.executeAsync(sql);
  return products;
}

// Get one product:
async function getOneProductAsync(id) {
  const sql = `SELECT ProductID as id, ProductName as name, UnitPrice as price, UnitsInStock as stock FROM Products WHERE ProductID = ${id}`;
  const products = await dal.executeAsync(sql);
  return products[0];
}

// Add product:
async function addProductAsync(product) {
  const sql = `INSERT INTO Products(ProductName, UnitPrice, UnitsInStock) VALUES('${product.name}', ${product.price}, ${product.stock})`;
  const info = await dal.executeAsync(sql);
  product.id = info.insertId;
  return product;
}

// Update full product:
async function updateFullProductAsync(product) {
  const sql = `UPDATE Products SET ProductName = '${product.name}', UnitPrice = ${product.price}, UnitsInStock = ${product.stock} WHERE ProductID = ${product.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : product;
}

// Update partial product:
async function updatePartialProductAsync(product) {
  const productToUpdate = await getOneProductAsync(product.id);
  if (!productToUpdate) return null;
  for (const prop in product) {
    if (product[prop] !== undefined) {
      productToUpdate[prop] = product[prop];
    }
  }
  return await updateFullProductAsync(productToUpdate);
}

// Delete product:
async function deleteProductAsync(id) {
  const sql = `DELETE FROM Products WHERE ProductID = ${id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows > 0;
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateFullProductAsync,
  updatePartialProductAsync,
  deleteProductAsync,
};
