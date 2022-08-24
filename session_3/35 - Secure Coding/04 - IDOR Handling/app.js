// Security issue:
// On the edit page url - user can set a different id number and see other user details.

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

// Receive uuid instead of id:
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
