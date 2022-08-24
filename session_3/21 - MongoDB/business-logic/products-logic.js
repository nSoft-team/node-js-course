const mongodb = require("mongodb");
const dal = require("../data-access-layer/dal");

// Get all products (SELECT * FROM products):
function getAllProductsAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({})
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get one product (SELECT * FROM products WHERE _id = ____):
function getOneProductAsync(_id) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .findOne({ _id: mongodb.ObjectId(_id) }, (err, product) => {
        // MongoDB primary key _id is a binary object. The route _id is a string. ObjectId function converts a string _id into a binary _id.
        if (err) return reject(err);
        resolve(product);
      });
  });
}

// Add product (INSERT INTO products VALUES(...)):
function addProductAsync(product) {
  return new Promise((resolve, reject) => {
    if (product.categoryId)
      product.categoryId = mongodb.ObjectId(product.categoryId); // Convert categoryId from string to ObjectId.
    dal
      .getDatabase()
      .collection("products")
      .insertOne(product, (err) => {
        // Only here, "products" collection will be created if not exist.
        if (err) return reject(err);
        resolve(product); // Here, the given product already contains the _id.
      });
  });
}

// Update product - first way (UPDATE products SET ... WHERE _id = ____):
function updateFullProductAsync(product) {
  return new Promise((resolve, reject) => {
    if (product.categoryId)
      product.categoryId = mongodb.ObjectId(product.categoryId); // Convert categoryId from string to ObjectId if exists.
    const _id = product._id;
    delete product._id; // Product to update must not contain the _id
    dal
      .getDatabase()
      .collection("products")
      .updateOne(
        { _id: mongodb.ObjectId(_id) },
        { $set: product },
        (err, info) => {
          if (err) return reject(err);
          product._id = _id; // Set back the product _id.
          resolve(info.result.n ? product : null); // info.result.n === 0 means no product found to update. info.result.nModified === 0 means no product found to update or product found but not updated cause there is no change.
        }
      );
  });
}

// Update product - first way (UPDATE products SET ... WHERE _id = ____):
async function updatePartialProductAsync(product) {
  const productToUpdate = await getOneProductAsync(product._id);
  if (!productToUpdate) return null;
  for (const prop in product) {
    if (product[prop] !== undefined) {
      productToUpdate[prop] = product[prop];
    }
  }
  return await updateFullProductAsync(productToUpdate);
}

// Delete product - second way (DELETE FROM products WHERE _id = ____):
function deleteProductAsync(_id) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .deleteOne({ _id: mongodb.ObjectId(_id) }, (err, info) => {
        if (err) return reject(err);
        resolve(info.result.n > 0);
      });
  });
}

// Additional Queries (Query Operators: $or, $gt, $gte, $lt, $lte, $eq, $ne, $in, $nin, $regex, ...)

// Get products with partial fields (SELECT ____, ____, ____ FROM products):
function getProductsPartialAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ price: 10 })
      .project(["name", "price"])
      .toArray((err, products) => {
        // First way - returns _id, name, price
        // dal.getDatabase().collection("products").find({ price: 10 }).project({ name: true, price: true, _id: false }).toArray((err, products) => { // Second way - returns name, price (without _id)
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get products by price (SELECT * FROM products WHERE price = ____):
function getProductsByPriceAsync(price) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ price })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get products by name AND price (SELECT * FROM products WHERE name = ____ AND price = ____):
function getProductsByNameAndPriceAsync(name, price) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ name, price })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get products by name OR price (SELECT * FROM products WHERE name = ____ OR price = ____):
function getProductsByNameOrPriceAsync(name, price) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ $or: [{ name }, { price }] })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get products by price range (SELECT * FROM products WHERE price >= ____ AND price <= ____):
function getProductsByPriceRangeAsync(minPrice, maxPrice) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ price: { $gte: minPrice, $lte: maxPrice } })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get sorted products (SELECT * FROM products ORDER BY price DESC, name ASC):
function getSortedProductsAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({}, { sort: { price: -1, name: 1 } })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get paged products (SELECT * FROM products LIMIT ____, ____):
function getPagedProductsAsync(skip, limit) {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({}, { skip, limit })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get products containing multiple words (SELECT * FROM products WHERE name LIKE '% %'):
function getMultipleWordsProductsAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .find({ name: { $regex: /^.+ .+$/ } })
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get all products, each including its category (SELECT P.*, C.* FROM products AS P JOIN categories AS C ON P.categoryId = C.categoryId):
function getProductsIncludingCategoryAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("products")
      .aggregate([
        {
          $lookup: {
            localField: "categoryId",
            foreignField: "_id",
            from: "categories",
            as: "category",
          },
        },
        {
          $unwind: "$category", // Deconstructs the "category" array to form a single category object for each product. If we omit this, the category will be an array containing only one object per product.
        },
      ])
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

// Get all categories, each including its products (SELECT C.*, P.* FROM categories AS C JOIN products AS P ON C.categoryId = P.categoryId):
function getCategoriesIncludingProductsAsync() {
  return new Promise((resolve, reject) => {
    dal
      .getDatabase()
      .collection("categories")
      .aggregate([
        {
          $lookup: {
            localField: "_id",
            foreignField: "categoryId",
            from: "products",
            as: "products",
          },
          // No need $unwind here cause each category can have several products.
        },
      ])
      .toArray((err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
  });
}

module.exports = {
  getAllProductsAsync,
  getOneProductAsync,
  addProductAsync,
  updateFullProductAsync,
  updatePartialProductAsync,
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
};
