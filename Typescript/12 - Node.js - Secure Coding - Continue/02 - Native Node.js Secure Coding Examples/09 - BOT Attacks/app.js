// Security issue:
// Hacker can create BOT requests to register/forum etc, which will cause garbage or fake users in the database.
// BOT = A shortage for Robot.
// CAPTCHA = Completely Automated Public Turing test to tell Computers and Humans Apart

global.config =
  process.env.NODE_ENV === "production"
    ? require("./config.json").production
    : require("./config.json").development;
const express = require("express");
const expressSession = require("express-session"); // npm i express-session
const expressRateLimit = require("express-rate-limit");
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const forumController = require("./controllers/forum-controller");
const usersController = require("./controllers/users-controller");
const sanitize = require("./middleware/sanitize");
const server = express();

server.use(
  "/api/",
  expressRateLimit({ windowMs: 1000, max: 1, message: "Are You a Hacker?" })
);

// Enable session:
server.use(
  expressSession({
    name: "captcha",
    secret: "CuteKittens",
    resave: true,
    saveUninitialized: false,
  })
);

server.use(express.json());
server.use(sanitize);
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
