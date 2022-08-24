// Private variable to this Module:
var x = 123;
console.log("first-module.js was required");

// Private function to this Module:
function doWork() {
  console.log("Doing some work...");
}
doWork(); // Will be called once when the Module's IIFE invoked.

// Exporting:
module.exports.message = "Hello All!";
exports.message2 = "Have a great day!"; // Can drop the "module." prefix.
exports.cat = { name: "Mitsi", age: 4 };
exports.doSomething = function () {
  console.log("Doing Something...");
};
