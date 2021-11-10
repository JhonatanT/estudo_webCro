import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
//import { router } from "./routes"
import cors from "cors";

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');
  setTimeout(async () => {
    await page.type('[name="username"]',"")
    await page.type('[name="password"]',"")
    await page.click('[type="submit"]')
  }, 3000);
  

  //await browser.close();
})();

//import "./database"

const app = express();

app.use(cors())

app.use(express.json())

app.listen(3030, () => console.log('Rodando na porta 3030'))