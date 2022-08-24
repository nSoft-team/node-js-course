const Employee = require("./employee");
const Customer = require("./customer");
const Supplier = require("./supplier");

const people = [];
people.push(new Employee("Moishe", "Ufnik", 12, 1000));
people.push(new Customer("Kipi", "Ben-Kipod", 13, "5326985687452315"));
people.push(new Supplier("Ugi", "Fletzet", 14, "USA"));

for (const p of people) {
  p.display();
  p.greet();
  if (p instanceof Employee) {
    console.log("Salary Tax: " + p.salary * 0.1);
  }
  console.log("-------------------------------");
}

console.log("VAT: " + Customer.VAT + "%");
console.log("$100 VAT: $" + Customer.getPriceVat(100));
console.log("Total Customers Created: " + Customer.totalCustomersCreated);
