const Person = require("./person");

class Customer extends Person {
  static VAT = 17.0;
  static #totalCustomersCreated = 0;

  constructor(firstName, lastName, age, creditCard) {
    super(firstName, lastName, age);
    this.creditCard = creditCard;
    Customer.#totalCustomersCreated++;
  }

  display() {
    super.display();
    console.log("Credit Card: " + this.creditCard);
  }

  greet() {
    console.log("Hello!");
  }

  static get totalCustomersCreated() {
    return Customer.#totalCustomersCreated;
  }

  static getPriceVat(price) {
    return (price * Customer.VAT) / 100;
  }
}

module.exports = Customer;
