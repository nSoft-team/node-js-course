const express = require("express");

// Create server using express:
const server = express();

// Return index.html when requesting http://localhost:3000:
server.use(express.static(__dirname + "/frontend"));

// Redirect to index on any other route:
server.use("*", (request, response) =>
  response.sendFile(__dirname + "/frontend/index.html")
);

// Start the service:
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
