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

describe("waist to hip test", () => {
  
  let page = null;

  beforeAll(async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage({ waitUntil: 'load' });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("calculates and prints waist to hip ratio", async () => {
    await page.goto("http://localhost:8080/waistHipResult?waist=32&hip=32&sex=male", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("result").innerText;
    });

    expect(Number(result)).toBe(1);
  });
  
  test("writes category for males", async () => {
    await page.goto("http://localhost:8080/waistHipResult?waist=9&hip=10&sex=male", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe("Overweight");
  });
  
  /*test("writes category for females", async () => {
    await page.goto("http://localhost:8080/waistHipResult?waist=8&hip=10", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe("Overweight");
  });

  each([
      [0.85, "Normal weight"],
      [0.95, "Overweight"],
      [1.05, "Obese"]
  ]).it("when ratio for males is '%d' category is '%s'", async (bmi, expected) => {
    await page.goto(`http://localhost:8080/waistHipResult?waist=${bmi}&hip=10`, {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe(expected);
  });

  each([
      [0.75, "Normal weight"],
      [0.82, "Overweight"],
      [0.90, "Obese"]
  ]).it("when ratio for females is '%d' category is '%s'", async (ratio, expected) => {
    await page.goto(`http://localhost:8080/waistHipResult?waist=${ratio}&hip=10`, {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe(expected);
  });

  each([
    ["NaN", "Ratio must be a number"],
    [-0.01, "Ratio cannot be a negative value"],
    [0, "Ratio cannot be zero"],
    [0, "Division by zero"]
  ]).it("when Ratio is '%d' shows error '%s'", async (ratio, expected) => {
    await page.goto(`http://localhost:8080/waistHipResult?waist=${ratio}&hip=10`, {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe(expected);
  });*/
});