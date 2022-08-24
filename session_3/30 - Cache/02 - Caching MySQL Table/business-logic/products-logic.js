const dal = require("../data-access-layer/dal");
const cache = require("memory-cache");
const delayAsync = require("../helper/delay-async");

// Get all products:
async function getAllProductsAsync() {
  if (!cache.get("products")) {
    const sql =
      "SELECT ProductID as id, ProductName as name, UnitPrice as price, UnitsInStock as stock FROM Products";
    const products = await dal.executeAsync(sql);
    await delayAsync(3000); // Demo Delay.
    cache.put("products", products, 1000 * 60 * 60);
  }

  return cache.get("products");
}

module.exports = {
  getAllProductsAsync,
};
