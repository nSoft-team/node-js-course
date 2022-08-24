// Load .env file for setting a test environment:
const dotenv = require("dotenv");
dotenv.config();

// Load one of three configs (although we don't use the "test" configuration in this project)
if (process.env.NODE_ENV === "test") {
  global.config = require("./config.json").test;
} else if (process.env.NODE_ENV === "production") {
  global.config = require("./config.json").production;
} else {
  global.config = require("./config.json").development;
}

const express = require("express");
const productsController = require("./controllers/products-controller");
const server = express();

server.use(express.json());
server.use("/api/products", productsController);
server.use("*", (request, response) =>
  response.status(404).send("Route Not Found")
);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

// Expose the server for the test files:
module.exports = server;
