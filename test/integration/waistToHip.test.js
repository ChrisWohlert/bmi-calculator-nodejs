const puppeteer = require('puppeteer');
const each = require("jest-each").default;


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
    
    test("writes category for females", async () => {
      await page.goto("http://localhost:8080/waistHipResult?waist=8&hip=10&sex=female", {waitUntil: 'load'});
    
      const result = await page.evaluate(() => {
        return document.getElementById("category").innerText;
      });
  
      expect(result).toBe("Overweight");
    });
  
    each([
        [0.85, "Normal weight"],
        [0.95, "Overweight"],
        [1.05, "Obese"]
    ]).it("when ratio for males is '%d' category is '%s'", async (waist, expected) => {
      await page.goto(`http://localhost:8080/waistHipResult?waist=${waist}&hip=1&sex=male`, {waitUntil: 'load'});
    
      const result = await page.evaluate(() => {
        return document.getElementById("category").innerText;
      });
  
      expect(result).toBe(expected);
    });
  
    each([
        [0.75, "Normal weight"],
        [0.82, "Overweight"],
        [0.90, "Obese"]
    ]).it("when ratio for females is '%d' category is '%s'", async (waist, expected) => {
      await page.goto(`http://localhost:8080/waistHipResult?waist=${waist}&hip=1&sex=female`, {waitUntil: 'load'});
    
      const result = await page.evaluate(() => {
        return document.getElementById("category").innerText;
      });
  
      expect(result).toBe(expected);
    });
  
    each([
      ["NaN", "Waist to hip ratio must be a number"],
      [-0.01, "Waist to hip ratio cannot be a negative value"],
      [0, "Waist to hip ratio cannot be zero"]
    ]).it("when Ratio is '%d' shows error '%s'", async (ratio, expected) => {
      await page.goto(`http://localhost:8080/waistHipResult?waist=${ratio}&hip=1&sex=male`, {waitUntil: 'load'});
    
      const result = await page.evaluate(() => {
        return document.getElementById("category").innerText;
      });
  
      expect(result).toBe(expected);
    });
});