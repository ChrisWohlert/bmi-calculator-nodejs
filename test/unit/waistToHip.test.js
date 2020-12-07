
const { calculateBMI } = require("../../src/bmiCalculator.js");
var calculator = require("../../src/bmiCalculator.js");
const each = require("jest-each").default;


describe("waist to hip test", () => {

    test("calculates waist to hip correctly", () => {
        const ratio = calculator.calculateWaistToHipRatio(32, 32);

        expect(ratio).toBe(1);
    });

   test("has correct categories", () => {
        expect("Normal weight").toBe(calculator.waistHipCategories.normal);
        expect("Overweight").toBe(calculator.waistHipCategories.overweight);
        expect("Obese").toBe(calculator.waistHipCategories.obese);
    });

    each([
        [0.89, "Normal weight"],
        [0.90, "Overweight"],
        [0.99, "Overweight"],
        [1, "Obese"]
    ]).it("when calculated for males ratio is '%d' category is '%s'", (waistHipRatio, expected) => {
        expect(calculator.calculateWaistToHipCategoryForMales(waistHipRatio)).toBe(expected);
    });

    each([
        ["NaN", "Waist to hip ratio must be a number"],
        [-0.1, "Waist to hip ratio cannot be a negative value"],
        [0, "Waist to hip ratio cannot be zero"]
    ]).it("when calculated waist to hip is '%d' throws invalid exception", (bmi, expected) => {
        expect(() => calculator.calculateWaistToHipCategoryForMales(bmi)).toThrow(expected);
    });

    each([
        [0.79, "Normal weight"],
        [0.80, "Overweight"],
        [0.84, "Overweight"],
        [0.85, "Obese"]
    ]).it("when calculated for females ratio is '%d' category is '%s'", (waistHipRatio, expected) => {
        expect(calculator.calculateWaistToHipCategoryForFemales(waistHipRatio)).toBe(expected);
    });

    each([
        ["NaN", "Waist to hip ratio must be a number"],
        [-0.1, "Waist to hip ratio cannot be a negative value"],
        [0, "Waist to hip ratio cannot be zero"]
    ]).it("when calculated waist to hip is '%d' throws invalid exception", (bmi, expected) => {
        expect(() => calculator.calculateWaistToHipCategoryForFemales(bmi)).toThrow(expected);
    });

});