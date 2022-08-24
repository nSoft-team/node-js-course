const { expect } = require("chai"); // npm i --save-dev chai
const request = require("supertest"); // npm i --save-dev supertest
const app = require("../../app.js");

describe("Testing GET all products", () => {
  it("should get empty array", async () => {
    const response = await request(app).get("/api/products");
    const products = response.body;
    expect(products.length).to.equal(0);
  });

  it("should get 5 products array", async () => {
    for (let i = 1; i <= 5; i++) {
      const product = { name: `Graphs${i}`, price: 10, stock: 100 };
      await request(app).post("/api/products").send(product);
    }

    const response = await request(app).get("/api/products");
    const products = response.body;
    expect(products.length).to.equal(5);

    for (const p of products) {
      expect(p).to.contain.property("_id");
      expect(p).to.contain.property("name");
      expect(p).to.contain.property("price");
      expect(p).to.contain.property("stock");
    }
  });
});
