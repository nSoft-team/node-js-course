const express = require("express");
const chat = require("./chat");
const server = express();

const port = process.env.PORT || 3001;
const listener = server.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);
chat.init(listener);
