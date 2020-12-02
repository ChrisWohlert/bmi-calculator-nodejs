
var calculator = require("../../src/bmiCalculator.js")

describe("bmi test", () => {

    test("Calculates BMI correctly", () => {
        const bmi = calculator.calculateBMI(1, 10);

        expect(bmi.value).toBe(100000);
    });

    test("Has correct categories", () => {
        expect("Underweight").toBe(calculator.categories.underweight);
        expect("Healthy").toBe(calculator.categories.healthy);
        expect("Overweight").toBe(calculator.categories.overweight);
        expect("Obese").toBe(calculator.categories.obese);
    });

    test("Calculates unduerweight correctly", () => {
        const bmi = calculator.calculateBMI(100, 18.4);

        expect(bmi.value).toBe(18.4);
        expect(bmi.category).toBe("Underweight");
    });

});