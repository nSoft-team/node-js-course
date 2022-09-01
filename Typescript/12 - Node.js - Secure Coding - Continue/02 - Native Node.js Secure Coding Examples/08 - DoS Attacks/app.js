// Security issue:
// Hacker can create a PoD to our server and thus create a DOS attack.
// PoD = Ping of Death.
// DoS = Deny of Service.
// DDoS = Distributed Deny of Service.

global.config =
  process.env.NODE_ENV === "production"
    ? require("./config.json").production
    : require("./config.json").development;
const express = require("express");
const expressRateLimit = require("express-rate-limit"); // npm i express-rate-limit
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const forumController = require("./controllers/forum-controller");
const usersController = require("./controllers/users-controller");
const sanitize = require("./middleware/sanitize");
const server = express();

// Limit user requests for preventing DoS/DDoS attacks (Note: if you're behind a reverse proxy like Heroku, Bluemix, AWS ELB, Nginx etc, you need also: server.set("trust proxy")):
server.use(
  "/api/",
  expressRateLimit({
    // Note: without the "/api/", the css and js won't work, probably because of base url change.
    windowMs: 1000, // 1 second.
    max: 1, // limit each IP to 1 request per windowMs.
    message: "Are You a Hacker?", // Custom message instead of default one.
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
