
const { calculateBMI } = require("../../src/bmiCalculator.js");
var calculator = require("../../src/bmiCalculator.js");
const each = require("jest-each").default;

describe("bmi test", () => {

    test("Calculates BMI correctly", () => {
        const bmi = calculator.calculateBMI(1, 10);

        expect(bmi).toBe(100000);
    });

    test("Has correct categories", () => {
        expect("Underweight").toBe(calculator.categories.underweight);
        expect("Healthy").toBe(calculator.categories.healthy);
        expect("Overweight").toBe(calculator.categories.overweight);
        expect("Obese").toBe(calculator.categories.obese);
    });

    each([
        ["NaN", "BMI must be a number"],
        [-0.1, "BMI cannot be a negative value"],
        [0, "BMI cannot be zero"]
    ]).it("when calculated weight is '%d' throws invalid exception", (bmi, expected) => {
        expect(() => calculator.calculateCategory(bmi)).toThrow(expected);
    });

    each([
        [18.3, "Underweight"],
        [18.4, "Underweight"],
        [18.5, "Healthy"],
        [24.9, "Healthy"],
        [25, "Overweight"],
        [29.9, "Overweight"],
        [30, "Obese"],
        [39.9, "Obese"]
    ]).it("when calculated weight is '%d' category is '%s'", (bmi, expected) => {
        expect(calculator.calculateCategory(bmi)).toBe(expected);
    });
});