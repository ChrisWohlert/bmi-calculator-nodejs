const puppeteer = require('puppeteer');


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
  
  test("Handles wrong input", async () => {
    await page.goto("http://localhost:8080/result?cm=notANumber&kg=10", {waitUntil: 'load'});
  
    expect(page.url()).toBe("http://localhost:8080/");
  });
  
  test("Writes category", async () => {
    await page.goto("http://localhost:8080/result?cm=1&kg=10", {waitUntil: 'load'});
  
    const result = await page.evaluate(() => {
      return document.getElementById("category").innerText;
    });

    expect(result).toBe("Obese");
  });

});

