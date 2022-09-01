const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await productsLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

module.exports = router;
