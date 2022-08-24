const express = require("express");

// Create server using express:
const server = express();

// Return index.html when requesting http://localhost:3000:
server.use(express.static(__dirname + "/frontend"));

// Or redirect to "/home" when requesting http://localhost:3000:
// server.get("/", (request, response) => response.redirect("/home"));

// Return specific pages on a specific routes:
server.get("/home", (request, response) =>
  response.sendFile(__dirname + "/frontend/index.html")
);
server.get("/about", (request, response) =>
  response.sendFile(__dirname + "/frontend/about.html")
);

// Return page not found on any other route:
server.use("*", (request, response) =>
  response.sendFile(__dirname + "/frontend/page-not-found.html")
);

// Start the service:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
