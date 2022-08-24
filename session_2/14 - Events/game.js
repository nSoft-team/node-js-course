const Car = require("./car");

class Game {
  start() {
    const car = new Car("Lamborghini", "Diablo");

    car.on("LowFuel", (args) => {
      console.log("Not enough fuel! Fuel left: " + args.fuelLeft);
    });

    car.on("NoFuel", () => {
      console.log("No Fuel :-(");
    });

    car.drive();
  }
}

module.exports = Game;
