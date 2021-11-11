const { off } = require('process');
const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  setTimeout(async () => {

    await page.type('[name="username"]', "jhonatantavaris@hotmail.com")
    await page.type('[name="password"]', "Jho@39412934")
    await page.click('[type="submit"]')

    await page.waitForNavigation();

    await page.goto('https://www.instagram.com/_geektogeek/');

    const imgList = await page.evaluate(() => {

      const nodeList = document.querySelectorAll('article img')
      const imgArray = [...nodeList]
      const imgList = imgArray.map(img => ({
        src: img.src
      }))
      return imgList

    })

    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {

      if (err) throw new Error("Algo deu ruim")

      console.log("SALVOU MLKOTE")

    })
    await browser.close();

  }, 1000);




})();