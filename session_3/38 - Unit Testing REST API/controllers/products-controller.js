const express = require("express");
const ProductModel = require("../models/product-model");
const productsLogic = require("../business-logic/products-logic");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await productsLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    const product = await productsLogic.getOneProductAsync(_id);
    if (!product) return response.status(404).send(`_id ${_id} not found.`);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const product = new ProductModel(request.body);
    const validationResult = product.validateSync();
    if (validationResult)
      return response
        .status(400)
        .send(Object.values(validationResult.errors).map((err) => err.message));
    const addedProduct = await productsLogic.addProductAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.put("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    request.body._id = _id;
    const product = new ProductModel(request.body);
    const validationResult = product.validateSync();
    if (validationResult)
      return response
        .status(400)
        .send(Object.values(validationResult.errors).map((err) => err.message));
    const updatedProduct = await productsLogic.updateProductAsync(product);
    if (!updatedProduct)
      return response.status(404).send(`_id ${_id} not found.`);
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    const deleted = await productsLogic.deleteProductAsync(_id);
    if (!deleted) return response.status(404).send(`_id ${_id} not found.`);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
