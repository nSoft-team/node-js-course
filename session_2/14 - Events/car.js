const EventEmitter = require("events");

class Car extends EventEmitter {
  constructor(manufacturer, model) {
    super();
    this.manufacturer = manufacturer;
    this.model = model;
  }

  drive() {
    let fuel = 10;

    const timer = setInterval(() => {
      console.log("Driving fast..."); // Demo for driving.

      fuel--;

      if (fuel > 0 && fuel <= 3) {
        this.emit("LowFuel", { fuelLeft: fuel });
      }

      if (fuel === 0) {
        this.emit("NoFuel");
        clearInterval(timer);
      }
    }, 2000);
  }
}

module.exports = Car;
