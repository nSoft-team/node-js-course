const express = require("express");
const ProductModel = require("../models/product-model");
const productsLogic = require("../business-logic/products-logic");
const router = express.Router();

// GET http://localhost:3001/api/products
router.get("/", async (request, response) => {
  try {
    // Logic:
    const products = await productsLogic.getAllProductsAsync();

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/some-id
router.get("/:_id", async (request, response) => {
  try {
    // Data:
    const _id = request.params._id;

    // Logic:
    const product = await productsLogic.getOneProductAsync(_id);
    if (!product) return response.status(404).send(`_id ${_id} not found.`);

    // Success:
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST http://localhost:3001/api/products
router.post("/", async (request, response) => {
  try {
    // Data:
    const product = new ProductModel(request.body);

    // Validation:
    const validationResult = product.validateSync(); // Note: product.validate() returns a Promise (and thus can be called with await), BUT for some reason if there are validation errors - it crashes and thus we're entering the catch and returning 500.
    if (validationResult)
      return response
        .status(400)
        .send(Object.values(validationResult.errors).map((err) => err.message)); // For returning a single string containing all errors: validationResult.message.

    // Logic:
    const addedProduct = await productsLogic.addProductAsync(product);

    // Success:
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// PUT http://localhost:3001/api/products/some-id
router.put("/:_id", async (request, response) => {
  try {
    // Data:
    const _id = request.params._id;
    request.body._id = _id;
    const product = new ProductModel(request.body);

    // Validation:
    const validationResult = product.validateSync();
    if (validationResult)
      return response
        .status(400)
        .send(Object.values(validationResult.errors).map((err) => err.message));

    // Logic:
    const updatedProduct = await productsLogic.updateProductAsync(product);
    if (!updatedProduct)
      return response.status(404).send(`_id ${_id} not found.`);

    // Success:
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// PATCH http://localhost:3001/api/products/some-id
router.patch("/:_id", async (request, response) => {
  try {
    // Data:
    const _id = request.params._id;
    request.body._id = _id;
    const product = new ProductModel(request.body);

    // Validation:
    const propsToValidate = Object.keys(request.body); // Validate only the given keys per patch concept.
    const validationResult = product.validateSync(propsToValidate);
    if (validationResult)
      return response
        .status(400)
        .send(Object.values(validationResult.errors).map((err) => err.message));

    // Logic:
    const updatedProduct = await productsLogic.updateProductAsync(product);
    if (!updatedProduct)
      return response.status(404).send(`_id ${_id} not found.`);

    // Success:
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// DELETE http://localhost:3001/api/products/some-id
router.delete("/:_id", async (request, response) => {
  try {
    // Data:
    const _id = request.params._id;

    // Logic:
    const deleted = await productsLogic.deleteProductAsync(_id);
    if (!deleted) return response.status(404).send(`_id ${_id} not found.`);

    // Success:
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Additional Queries:

// GET http://localhost:3001/api/products/partial/fields
router.get("/partial/fields", async (request, response) => {
  try {
    // Logic:
    const products = await productsLogic.getProductsPartialAsync();

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/by-price/some-price
router.get("/by-price/:price", async (request, response) => {
  try {
    // Data:
    const price = +request.params.price;

    // Logic:
    const products = await productsLogic.getProductsByPriceAsync(price);

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/by-name-and-price/some-name/some-price
router.get("/by-name-and-price/:name/:price", async (request, response) => {
  try {
    // Data:
    const name = request.params.name;
    const price = +request.params.price;

    // Logic:
    const products = await productsLogic.getProductsByNameAndPriceAsync(
      name,
      price
    );

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/by-name-or-price/some-name/some-price
router.get("/by-name-or-price/:name/:price", async (request, response) => {
  try {
    // Data:
    const name = request.params.name;
    const price = +request.params.price;

    // Logic:
    const products = await productsLogic.getProductsByNameOrPriceAsync(
      name,
      price
    );

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/by-price-range/some-min-price/some-max-price
router.get("/by-price-range/:minPrice/:maxPrice", async (request, response) => {
  try {
    // Data:
    const minPrice = +request.params.minPrice;
    const maxPrice = +request.params.maxPrice;

    // Logic:
    const products = await productsLogic.getProductsByPriceRangeAsync(
      minPrice,
      maxPrice
    );

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/sorted/price-desc-name-asc
router.get("/sorted/price-desc-name-asc", async (request, response) => {
  try {
    // Logic:
    const products = await productsLogic.getSortedProductsAsync();

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/paged/some-skip/some-limit
router.get("/paged/:skip/:limit", async (request, response) => {
  try {
    // Data:
    const skip = +request.params.skip;
    const limit = +request.params.limit;

    // Logic:
    const products = await productsLogic.getPagedProductsAsync(skip, limit);

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/search/multiple-words
router.get("/search/multiple-words", async (request, response) => {
  try {
    // Logic:
    const products = await productsLogic.getMultipleWordsProductsAsync();

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/join/products-including-category
router.get("/join/products-including-category", async (request, response) => {
  try {
    // Logic:
    const products = await productsLogic.getProductsIncludingCategoryAsync();

    // Success:
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/join/categories-including-products
router.get("/join/categories-including-products", async (request, response) => {
  try {
    // Logic:
    const categories =
      await productsLogic.getCategoriesIncludingProductsAsync();

    // Success:
    response.json(categories);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// GET http://localhost:3001/api/products/transaction/swap-prices/some-id/some-id
router.post(
  "/transaction/swap-prices/:_id1/:_id2",
  async (request, response) => {
    try {
      // Data:
      const _id1 = request.params._id1;
      const _id2 = request.params._id2;

      // Logic:
      const products = await productsLogic.swapPricesAsync(_id1, _id2);

      // Success:
      response.json(products);
    } catch (err) {
      response.status(500).send(err.message);
    }
  }
);

module.exports = router;
