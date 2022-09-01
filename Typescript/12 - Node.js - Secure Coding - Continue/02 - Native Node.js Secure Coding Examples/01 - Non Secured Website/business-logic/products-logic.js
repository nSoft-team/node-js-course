const dal = require("../data-access-layer/dal");

async function getAllProductsAsync() {
  const sql =
    "SELECT ProductID as id, ProductName as name, UnitPrice as price, UnitsInStock as stock FROM products";
  const products = await dal.executeAsync(sql);
  return products;
}

module.exports = {
  getAllProductsAsync,
};
