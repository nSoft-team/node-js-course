const display = require("./logic/display");

function displayDate() {
  const now = new Date();
  console.log("Date: " + now.toLocaleDateString());
}

function displayTime() {
  const now = new Date();
  console.log("Time: " + now.toLocaleTimeString());
}

function displayNow() {
  display.dateTime();
}

// Following will be exported outside the package:
module.exports = {
  displayDate,
  displayTime,
  displayNow,
};
