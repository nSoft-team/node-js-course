const { expect } = require("chai"); // npm i --save-dev chai
const supertest = require("supertest"); // npm i --save-dev supertest
const app = require("../../app.js");

describe("Testing POST product", () => {
  it("should add a product", async () => {
    const product = { name: "Apple", price: 3.5, stock: 100 };
    const response = await supertest(app).post("/api/products").send(product);
    const addedProduct = response.body;
    expect(addedProduct).to.not.be.empty;
  });

  it("should contain _id, name, price, stock", async () => {
    const product = { name: "Banana", price: 4.7, stock: 200 };
    const response = await supertest(app).post("/api/products").send(product);
    const addedProduct = response.body;
    expect(addedProduct).to.contain.property("_id");
    expect(addedProduct).to.contain.property("name");
    expect(addedProduct).to.contain.property("price");
    expect(addedProduct).to.contain.property("stock");
  });

  it("should contain original product", async () => {
    const product = { name: "Peach", price: 5.2, stock: 300 };
    const response = await supertest(app).post("/api/products").send(product);
    const addedProduct = response.body;
    expect(addedProduct).to.contain(product);
  });

  it("should results in 3 validation errors", async () => {
    const product = { price: -10, stock: 100000 };
    const response = await supertest(app).post("/api/products").send(product);
    const errors = response.body;
    expect(errors.length).to.equal(3);
  });
});
