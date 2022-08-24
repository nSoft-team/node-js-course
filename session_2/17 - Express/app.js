/*  
    To get much more out of node's HTTP capabilities, we can use Express.
    It will create a RESTful service by using the http module.
    It can also create dynamic web pages using a templating engine (such as Jade or EJS).
 */

const express = require("express");

// Create server using express:
const server = express();

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
  const product = { id: 2, name: "Bananas", price: 4.7, stock: 200 };
  response.json(product);
});

// Any other route (must be last):
server.use("*", (request, response) => {
  response.status(404).send("Route Not Found");
});

// Start the service:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
