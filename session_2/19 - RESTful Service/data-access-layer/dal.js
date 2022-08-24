// Data Access Layer.

const fs = require("fs");

// Get all products from the file:
function getAllProductsAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(config.database.location, "utf-8", (err, fileContent) => {
      if (err) return reject(err);
      const products = JSON.parse(fileContent);
      resolve(products);
    });
  });
}

// Save all products back to the file:
function saveAllProductsAsync(products) {
  return new Promise((resolve, reject) => {
    const fileContent = JSON.stringify(products, null, 4);
    fs.writeFile(config.database.location, fileContent, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = {
  getAllProductsAsync,
  saveAllProductsAsync,
};
