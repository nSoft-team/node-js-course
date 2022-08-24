const express = require("express");

// Create server using express:
const server = express();

// Create a middleware which displays the request data:
function displayRequestData(request, response, next) {
  console.log(request.method, request.url); // Display those values on each request.
  next();
}

// Create a middleware which displays current time:
function displayCurrentTime(request, response, next) {
  const date = new Date();
  console.log(date.toLocaleTimeString());
  next();
}

// Use first middleware on all routes:
server.use(displayRequestData);

// Use second middleware only on this route:
server.get("/", displayCurrentTime, (request, response) => {
  response.send("Welcome :-)");
});

// Get all products:
server.get("/api/products", (request, response) => {
  const products = [
    { id: 1, name: "Apple", price: 3.5, stock: 100 },
    { id: 2, name: "Banana", price: 4.7, stock: 200 },
    { id: 3, name: "Peach", price: 5.2, stock: 300 },
  ];
  response.json(products);
});

// Get top product:
server.get("/api/top-product", (request, response) => {
  const product = { id: 2, name: "Banana", price: 4.7, stock: 200 };
  response.json(product);
});

// Any other route (must be last):
server.use("*", (request, response) => {
  response.status(404).send("Route Not Found");
});

// Start the service:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
