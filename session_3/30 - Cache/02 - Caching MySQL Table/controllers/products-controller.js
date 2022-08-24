const express = require("express");
const productsLogic = require("../business-logic/products-logic");

// Create the router.
const router = express.Router();

// Get all products:
router.get("/", async (request, response) => {
  try {
    const products = await productsLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
