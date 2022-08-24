// Saving and loading all products from Northwind database on MySQL.

global.config =
  process.env.NODE_ENV === "production"
    ? require("./config.json").production
    : require("./config.json").development;
const express = require("express");
const productsController = require("./controllers/products-controller");
const systemErrors = require("./middleware/system-errors");

// Create the server:
const server = express();

// Enable parsing of JSON in the body:
server.use(express.json());

// System errors:
server.use(systemErrors);

// Set products controller to be relative to /api/products route:
server.use("/api/products", productsController);

// Any other route (must be last):
server.use("*", (request, response) =>
  response.status(404).send("Route Not Found")
);

// Start the server:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
