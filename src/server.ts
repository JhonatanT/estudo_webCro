import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
//import { router } from "./routes"
import cors from "cors";

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage('1');
  await page.goto('https://temp-mail.org/pt/');

  setTimeout(async () => {
    const email = await page.evaluate(() => {

      return document.querySelector('[id="mail"]')?.value
    })

    const page1 = await browser.newPage('2');
    await page1.goto('https://www.instagram.com/accounts/emailsignup/');

    setTimeout(async () => {
      await page1.type('[name="emailOrPhone"]', email)
      await page1.type('[name="fullName"]', "testaos")
      await page1.type('[name="username"]', "wqeqweqw2WW")
      await page1.type('[name="password"]', "wqeqweqw2WW")
      setTimeout(async () => { await page.click('[type="submit"]') }, 1000)

    }, 1000)

  }, 4000)








})();

const app = express();

app.use(cors())

app.use(express.json())

app.listen(3030, () => console.log('Rodando na porta 3030'))