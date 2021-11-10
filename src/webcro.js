const { off } = require('process');
const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/_geektogeek/');

  const imgList = await page.evaluate(() => {
    
    const nodeList = document.querySelectorAll('article img')
    const imgArray = [...nodeList]
    const imgList = imgArray.map(({src}) => ({
      src
    }))
    return imgList

  })

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {

    if(err) throw new Error("Algo deu ruim")

    console.log("SALVOU MLKOTE")

  })

  await browser.close();
})();