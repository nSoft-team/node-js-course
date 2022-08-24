// Saving and loading all products from Northwind database on MySQL.

global.config = require("./config");
const express = require("express");
const productsController = require("./controllers/products-controller");

// Create the server:
const server = express();

// Set products controller to be relative to /api/products route:
server.use("/api/products", productsController);

// Any other route (must be last):
server.use("*", (request, response) => {
  response.status(404).send("Route Not Found");
});

// Start the server:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
