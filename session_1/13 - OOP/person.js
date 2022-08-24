class Person {
  #age = 0; // private

  constructor(firstName, lastName, age) {
    if (new.target === Person) {
      throw new TypeError(
        "Cannot create an instance from the abstract class Person."
      );
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.#age = age;
  }

  set age(value) {
    if (!isFinite(value) || value <= 0) {
      throw new Error("Age must be positive numeric value.");
    }
    this.#age = value;
  }

  get age() {
    return this.#age;
  }

  display() {
    console.log("First Name: " + this.firstName);
    console.log("Last Name: " + this.lastName);
    console.log("Age: " + this.age);
  }

  greet() {
    throw new Error("You must implement the function greet.");
  }
}

module.exports = Person;
