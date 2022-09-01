// Security issues:
// A non logged-in user can go to http://localhost:3000/api/products and see the products.
// A non logged-in user can set a user entry in the sessionStorage (e.g: user --> {"firstName": "A", "lastName": "B"}) and then go to the products page.

global.config =
  process.env.NODE_ENV === "production"
    ? require("./config.json").production
    : require("./config.json").development;
const express = require("express");
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const forumController = require("./controllers/forum-controller");
const usersController = require("./controllers/users-controller");
const server = express();

server.use(express.json());
server.use("/api/auth", authController);
server.use("/api/products", productsController);
server.use("/api/forum", forumController);
server.use("/api/users", usersController);
server.use(express.static(__dirname + "/frontend"));
server.get("/home", (request, response) =>
  response.sendFile(__dirname + "/frontend/index.html")
);
server.get("/products", (request, response) =>
  response.sendFile(__dirname + "/frontend/products.html")
);
server.get("/forum", (request, response) =>
  response.sendFile(__dirname + "/frontend/forum.html")
);
server.get("/users/edit/:uuid", (request, response) =>
  response.sendFile(__dirname + "/frontend/edit.html")
);
server.get("/login", (request, response) =>
  response.sendFile(__dirname + "/frontend/login.html")
);
server.get("/register", (request, response) =>
  response.sendFile(__dirname + "/frontend/register.html")
);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
