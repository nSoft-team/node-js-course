const express = require("express");
const session = require("express-session");

const server = express();

server.use(
  session({
    name: "cookie-name", // Name of Session ID Cookie.
    secret: "some-secret-key", // Encryption key for the Session ID Cookie.
    resave: true, // Start counting session time from scratch on every request.
    saveUninitialized: false, // (Documentation is not clear.)
  })
);

server.get("/save-session", (request, response) => {
  // Save session values:
  request.session.lastVisit = new Date().toLocaleString();
  request.session.randomNumber = Math.floor(Math.random() * 100);

  console.log("Session saved...");

  response.end();
});

server.get("/read-session", (request, response) => {
  // Read session values:
  console.log("Last Visit: " + request.session.lastVisit);
  console.log("Random Number: " + request.session.randomNumber);

  response.end();
});

server.get("/clear-session", (request, response) => {
  // Destroy entire session:
  request.session.destroy();

  console.log("Session destroyed...");

  response.end();
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
