// Using Custom Module
const myCalc = require("./calc");
console.log(myCalc.add(10, 20));
console.log(myCalc.sub(30, 40));

// Using Built-In Module:
const operatingSystem = require("os"); // os is this module name
console.log(operatingSystem.userInfo().username);
console.log(operatingSystem.totalmem());
console.log(operatingSystem.freemem());

// Using npm Module:
const leet = require("leet");
console.log(
  leet.convert(
    "Node.js is an amazing backend platform to build amazing services..."
  )
);
