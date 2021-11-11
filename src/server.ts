import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
//import { router } from "./routes"
import cors from "cors";

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {


  async function loadMore(page, selector) {
    const moreB = await page.$(selector)
    if(moreB){
      console.log("MORE")
      await moreB.click()
      await page.waitFor(selector,{timeout:3000}).catch(() => {console.log("timeout")})
      await loadMore(page, selector)
    }
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  setTimeout(async () => {

    await page.type('[name="username"]', "wqeqweqw2WW122")
    await page.type('[name="password"]', "wqeqweqw2WW2222")
    await page.click('[type="submit"]')

    await page.waitForNavigation();

    await page.goto('https://www.instagram.com/p/CVRk1GYLjf1/');

    await loadMore(page, 'div .qF0y9.Igw0E.IwRSH.YBx95._4EzTm.NUiEW')
    const imgList = await page.evaluate(() => {

      var con = []; 
      const numLinha = document.querySelectorAll('article span.Jv7Aj.mArmR.MqpiF').length;

      for(var i=0; i < numLinha; i++){
        var nome = document.querySelectorAll('article span.Jv7Aj.mArmR.MqpiF')[i].innerText; 
        con.push(nome)
      } console.log(con)
      return con
    })
    fs.writeFile('nomes_posts.json', JSON.stringify(imgList, null, 2), (err: any)=> {

      if (err) throw new Error("Algo deu ruim")

      console.log("SALVOU MLKOTE")

    })
    //await browser.close();
  }, 1000);
})();

const app = express();

app.use(cors())

app.use(express.json())

app.listen(3030, () => console.log('Rodando na porta 3030'))