const express = require("express");
const ProductModel = require("../models/product-model");
const productsLogic = require("../business-logic/products-logic-1");
// const productsLogic = require("../business-logic/products-logic-2");

// Create the router.
const router = express.Router();

// Get all products:
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

// Get one product:
router.get("/:id([0-9]+)", async (request, response) => {
  try {
    // Data:
    const id = +request.params.id;

    // Logic:
    const product = await productsLogic.getOneProductAsync(id);
    if (!product) return response.status(404).send(`id ${id} not found.`);

    // Success:
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Add product:
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

// Update full product:
router.put("/:id([0-9]+)", async (request, response) => {
  try {
    // Data:
    const id = +request.params.id;
    request.body.id = id;
    const product = new ProductModel(request.body);

    // Validation:
    const errors = product.validatePut();
    if (errors) return response.status(400).send(errors);

    // Logic:
    const updatedProduct = await productsLogic.updateFullProductAsync(product);
    if (!updatedProduct)
      return response.status(404).send(`id ${id} not found.`);

    // Success:
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Update partial product:
router.patch("/:id([0-9]+)", async (request, response) => {
  try {
    // Data:
    const id = +request.params.id;
    request.body.id = id;
    const product = new ProductModel(request.body);

    // Validation:
    const errors = product.validatePatch();
    if (errors) return response.status(400).send(errors);

    // Logic:
    const updatedProduct = await productsLogic.updatePartialProductAsync(
      product
    );
    if (!updatedProduct)
      return response.status(404).send(`id ${id} not found.`);

    // Success:
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Delete product:
router.delete("/:id([0-9]+)", async (request, response) => {
  try {
    // Data:
    const id = +request.params.id;

    // Logic:
    const deleted = await productsLogic.deleteProductAsync(id);
    if (!deleted) return response.status(404).send(`id ${id} not found.`);

    // Success:
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
