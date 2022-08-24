// http module is a node built-in module for http communication.

const http = require("http");

const server = http.createServer((request, response) => {
  // http://localhost:3000/api/products
  if (request.method === "GET" && request.url === "/api/products") {
    const products = [
      { id: 1, name: "Apple", price: 3.5, stock: 100 },
      { id: 2, name: "Banana", price: 4.7, stock: 200 },
      { id: 3, name: "Peach", price: 5.2, stock: 300 },
    ];
    response.setHeader("content-type", "application/json");
    response.write(JSON.stringify(products));
  }

  // http://localhost:3000/api/top-product
  else if (request.method === "GET" && request.url === "/api/top-product") {
    const product = { id: 2, name: "Banana", price: 4.7, stock: 200 };
    response.setHeader("content-type", "application/json");
    response.write(JSON.stringify(product));
  } else {
    response.statusCode = 404;
    response.write("Route Not Found");
  }

  response.end();
});

const port = process.env.PORT || 3001;
server.listen(port);
