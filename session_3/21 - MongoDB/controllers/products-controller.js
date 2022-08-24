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
    const errors = product.validatePost();
    if (errors) return response.status(400).send(errors);

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
    const errors = product.validatePut();
    if (errors) return response.status(400).send(errors);

    // Logic:
    const updatedProduct = await productsLogic.updateFullProductAsync(product);
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
    const errors = product.validatePatch();
    if (errors) return response.status(400).send(errors);

    // Logic:
    const updatedProduct = await productsLogic.updatePartialProductAsync(
      product
    );
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

module.exports = router;
