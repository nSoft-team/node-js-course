// Security issues:
// Passwords returned to client and stored in sessionStorage.
// Passwords are not hashed nor salted in the database.
// Access to MySQL is performed via root user, without any password.

// To set a password to root:
// MySQL --> northwind --> Privileges --> Edit Privileges (for root localhost) --> Change Password --> Set Password/Re-Type --> Go
// Then you must search for config.inc.php file in wamp/xampp folders and set that exact password so phpmyadmin could work.

// To create another user account + password:
// MySQL --> phpMyAdmin (logo) --> User accounts --> Add user account --> Set User name / Host name (Local) / Password / Re-type --> Global privileges --> check suitable checkboxes --> Go

// To delete a user account:
// MySQL --> phpMyAdmin (logo) --> User accounts --> Check desired user account --> Check "Drop the databases that have the same names as the users." --> Go

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
server.get("/users/edit/:id", (request, response) =>
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
