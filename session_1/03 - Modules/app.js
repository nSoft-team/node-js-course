// Importing first-module:
const firstModule = require("./first-module"); // ./ means same directory as current file.

// Using the Module's exports:
console.log(firstModule.message);
console.log(firstModule.message2);
console.log("Name: " + firstModule.cat.name + ", Age: " + firstModule.cat.age);
firstModule.doSomething();

// Importing second-module2 which is exported as a single function:
const secondModule = require("./second-module");
secondModule();
