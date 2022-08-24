// RESTful Service using MongoDB with Mongoose

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

// Mongoose bugs I found:
// 1. await someModel.validate() throw exception on validation errors, thus I don't use it.
// 2. SomeSchema.pre("validate", function(next) { ... }) in some real-life project never executes when calling someModel.validateSync(), only on someModel.validate() (in this example though it working fine).
// 3. If an inner schema validation failed - it reports twice the validation error - once the custom error message and once a system error message.
// 4. Sometimes someModel.validateSync() return errors object only once when validation failed. Calling it again on the same model object returns undefined.
