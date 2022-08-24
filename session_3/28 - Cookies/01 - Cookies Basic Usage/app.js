const express = require("express");
const cookie = require("cookie-parser");

const server = express();
server.use(cookie());

server.get("/save-cookies", (request, response) => {
  // Saving non-persistent cookie:
  response.cookie("lastVisit", new Date().toLocaleString());

  // Saving persistent cookie (24 hours):
  response.cookie("randomNumber", Math.floor(Math.random() * 100), {
    maxAge: 1000 * 60 * 60 * 24,
  });

  console.log("Saving Cookies...");

  response.end();
});

server.get("/read-cookies", (request, response) => {
  // Reading all cookies:
  console.log(request.cookies);

  // Reading lastVisit cookie:
  console.log("Last Visit: " + request.cookies.lastVisit);

  // Reading randomNumber cookie:
  console.log("Random Number: " + request.cookies.randomNumber);

  response.end();
});

server.get("/clear-cookies", (request, response) => {
  // Clearing Cookies:
  response.clearCookie("lastVisit");
  response.clearCookie("randomNumber");

  console.log("Clearing Cookies...");

  response.end();
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
