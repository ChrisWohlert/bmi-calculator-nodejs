const puppeteer = require('puppeteer');
const each = require("jest-each").default;


describe("waist to hip index", () => {

    let page = null;
  
    beforeAll(async () => {
      const browser = await puppeteer.launch();
      page = await browser.newPage({ waitUntil: 'load' });
    });
  
    afterAll(async () => {
      await browser.close();
    });

    test("given waist and hip, goes to result", async () => {
        await page.goto("http://localhost:8080/", {waitUntil: 'load'});
      
        await page.evaluate(() => {
            document.getElementById("waist").value = "1";
            document.getElementById("hip").value = "1";
            document.getElementById("male").setAttribute("checked", true);
        });

        await page.click("#submitWaistToHip");
    
        expect(page.url()).toBe("http://localhost:8080/waistHipResult?waist=1&hip=1&sex=male");
      });

      test("given waist and hip, goes to result as female", async () => {
          await page.goto("http://localhost:8080/", {waitUntil: 'load'});
        
          await page.evaluate(() => {
              document.getElementById("waist").value = "1";
              document.getElementById("hip").value = "1";
              document.getElementById("female").setAttribute("checked", true);
          });
  
          await page.click("#submitWaistToHip");
      
          expect(page.url()).toBe("http://localhost:8080/waistHipResult?waist=1&hip=1&sex=female");
        });
  

});