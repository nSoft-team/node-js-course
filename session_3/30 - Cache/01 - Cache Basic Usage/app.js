const express = require("express");
const cache = require("memory-cache");
const server = express();

server.get("/api/top-product", (request, response) => {
  if (!cache.get("top-product")) {
    // Get product from database:
    const topProduct = { id: 1, name: "Apple", price: 3.5 };

    // Stored for 10s + notify when remove. If there is no time (and no callback), the item stored forever.
    cache.put("top-product", topProduct, 10000, (key, value) => {
      console.log("Removing key: " + key + " with value: ", value);
    });
  }

  response.json(cache.get("top-product"));
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
