const express = require("express");
const fs = require("fs");

const server = express();

server.use(express.static(__dirname + "/frontend"));

// Stream back video:
server.get("/video", (request, response) => {
  fs.stat("./videos/bunny.mp4", (err, stat) => {
    if (err) {
      response.status(500).send(err.message);
      return;
    }

    const len = stat.size;

    response.setHeader("Content-Type", "video/mp4");
    response.setHeader("Content-Length", len);
    response.setHeader("Content-Range", `bytes 0-${len - 1}/${len}`);
    response.setHeader("Accept-Ranges", "bytes");
    response.status(206);

    const stream = fs
      .createReadStream("./videos/bunny.mp4", { start: 0, end: len })
      .on("open", () => {
        stream.pipe(response);
      });
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
