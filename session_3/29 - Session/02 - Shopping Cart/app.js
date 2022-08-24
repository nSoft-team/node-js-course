const express = require("express");
const session = require("express-session");
const products = require("./products.json");

const server = express();

server.use(express.static(__dirname));

server.use(
  session({
    name: "ShoppingCart",
    secret: "KittensAreCute",
    resave: true,
    saveUninitialized: false,
  })
);

server.put("/api/add-to-cart/:id", (request, response) => {
  const product = products.find((p) => p.id === +request.params.id);
  if (!product) {
    response.sendStatus(404);
    return;
  }

  if (!request.session.cart) {
    request.session.cart = [];
  }

  request.session.cart.push(product);
  response.end();

  console.log(request.session.cart);
});

server.put("/api/remove-from-cart/:id", (request, response) => {
  if (!request.session.cart) {
    response.status(400).send("Cart is Empty");
    return;
  }

  const index = request.session.cart.findIndex(
    (p) => p.id === +request.params.id
  );

  if (index === -1) {
    response.status(400).send("Product isn't in the Cart");
    return;
  }

  request.session.cart.splice(index, 1);
  response.end();

  console.log(request.session.cart);
});

server.get("/api/checkout", (request, response) => {
  if (!request.session.cart) {
    response.status(400).send("Cart is Empty");
    return;
  }
  response.json(request.session.cart);
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
