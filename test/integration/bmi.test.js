const puppeteer = require('puppeteer');
const each = require("jest-each").default;


describe("BMI tests", () => {
  
  let page = null;

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage({ waitUntil: 'load' });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Calculates and prints BMI", async () => {
    await page.goto("http://localhost:8080/result?cm=1&kg=10", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("result").innerText;
    });

    expect(Number(result)).toBe(100000);
  });
  
  test("Writes category", async () => {
    await page.goto("http://localhost:8080/result?cm=1&kg=10", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe("Obese");
  });

  each([
    ["NaN", "BMI must be a number"],
    [-0.1, "BMI cannot be a negative value"],
    [0, "BMI cannot be zero"]
  ]).it("when BMI is '%d' shows error '%s'", async (bmi, expected) => {
    await page.goto(`http://localhost:8080/result?cm=100&kg=${bmi}`, {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe(expected);
  });

  each([
      [15, "Underweight"],
      [20, "Healthy"],
      [25, "Overweight"],
      [35, "Obese"]
  ]).it("when BMI is '%d' category is '%s'", async (bmi, expected) => {
    await page.goto(`http://localhost:8080/result?cm=100&kg=${bmi}`, {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe(expected);
  });

});