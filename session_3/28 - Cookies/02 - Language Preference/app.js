const express = require("express");
const cookie = require("cookie-parser");
const server = express();

server.use(express.static(__dirname));
server.use(cookie());

server.get("/content", (request, response) => {
  let content;

  if (!request.cookies.language || request.cookies.language === "en") {
    content = "Content in English";
  } else if (request.cookies.language === "he") {
    content = "תוכן בעברית";
  }

  response.send(content);
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
