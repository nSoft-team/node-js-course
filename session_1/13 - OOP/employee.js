const Person = require("./person");

class Employee extends Person {
  constructor(firstName, lastName, age, salary) {
    super(firstName, lastName, age);
    this.salary = salary;
  }

  display() {
    super.display();
    console.log("Salary: " + this.salary);
  }

  greet() {
    console.log("Howdy!");
  }
}

module.exports = Employee;
