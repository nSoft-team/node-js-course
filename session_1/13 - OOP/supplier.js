const Person = require("./person");

class Supplier extends Person {
  constructor(firstName, lastName, age, shippingCountry) {
    super(firstName, lastName, age);
    this.shippingCountry = shippingCountry;
  }

  display() {
    super.display();
    console.log("Shipping Country: " + this.shippingCountry);
  }

  greet() {
    console.log("Hi!");
  }
}

module.exports = Supplier;
