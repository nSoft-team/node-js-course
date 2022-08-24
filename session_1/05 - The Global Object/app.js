// In Node.js there is a global object called global, instead of the browser's window global object.
// It contains Node global data and operations.
// Any variable or function defined in the script are not part of the global object.
// The global object is not meant for adding variables or functions to it.
// The global object contains the following functions which are similar to the browser's JavaScript:
// console, setTimeout, clearTimeout, setInterval, clearInterval

var num = 123; // won't be a part of the global object.
console.log(num); // 123
console.log(global.num); // undefined

function doSomething() {
  // won't be a part of the global object.
  console.log("Doing Something...");
}
doSomething(); // Doing Something...
// global.doSomething(); // Error: global.doSomething is not a function

global.num2 = 456; // Will be a part from the global object.
console.log(global.num2); // 456
console.log(num2); // 456

global.doSomething2 = () => {
  // Will be a part from the global object.
  console.log("Doing Something 2...");
};
global.doSomething2(); // Doing Something 2...
doSomething2(); // Doing Something 2...

// Display some data:
global.console.log("Node Version: ", global.process.version);

// Same, but without prefixing it with global:
console.log("Node Version: ", process.version);

console.log("Node Process: ", process);

// Display some environment variables:
console.log("Number of Processors: " + process.env.NUMBER_OF_PROCESSORS);
console.log("Username: " + process.env.USERNAME);
