const { expect } = require("chai"); // npm i --save-dev chai
const calc = require("../calc");

describe("Testing calc.js", () => {
  describe("Testing getSum()", () => {
    it("should return 15", () => {
      const result = calc.getSum([1, 2, 3, 4, 5]);
      expect(result).to.be.equal(15); // can remove the "be", but more clear with it
    });

    it("should return 5", () => {
      const result = calc.getSum([1, 1, 1, 1, 1]);
      expect(result).to.be.equal(5);
    });
  });

  describe("Testing getAvg()", () => {
    it("should return 3", () => {
      const result = calc.getAvg([1, 2, 3, 4, 5]);
      expect(result).to.be.equal(3);
    });

    it("should be positive", () => {
      const result = calc.getAvg([12, 23, 334, 45454, 34, 45, 34, 2, 45, 34]);
      expect(result).to.be.greaterThan(0);
    });
  });

  describe("Testing async getMaxAsync()", () => {
    it("should return 10", async () => {
      const result = await calc.getMaxAsync([7, 4, 3, 10, 4]);
      expect(result).to.be.equal(10);
    });

    it("should return negative number", async () => {
      const result = await calc.getMaxAsync([-4, -7, -2, -5, -100, -3]);
      expect(result).to.be.lessThan(0);
    });
  });

  describe("Testing getMin() exceptions", () => {
    // Note: never check for exception message, cause it might change easily in the future.

    it("should throw exception when sending non array value", () => {
      try {
        calc.getMin("This is not an array");
        expect.fail(); // Fail if got here, thus if function won't throw anything for some reason, the test will still fail.
      } catch (err) {
        expect(err).to.be.an("Error"); // Error type (case-insensitive).
      }
    });

    it("should throw exception when sending an empty array", () => {
      expect(() => calc.getMin([])).to.throw();
    });
  });
});
