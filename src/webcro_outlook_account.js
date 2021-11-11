const { off } = require('process');
const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://signup.live.com/signup');

  await page.type('[name="MemberName"]', "foiporra@outlook.com")
  await page.click('[id="iSignupAction"]')
  setTimeout(async () => {
    await page.type('[name="Password"]', "@1234567")
    await page.click('[id="iSignupAction"]')
    setTimeout(async () => {
      await page.type('[name="FirstName"]', "Joao16952")
      await page.type('[name="LastName"]', "Tratayw")
      await page.click('[id="iSignupAction"]')
      setTimeout(async () => {
        await page.type('[name="BirthDay"]', "29")
        await page.type('[name="BirthMonth"]', "janeiro")
        await page.type('[name="BirthYear"]', "2000")
        await page.click('[id="iSignupAction"]')
        setTimeout(async () => { await page.click('[id="iSignupAction"]') }, 1000)//tem desafio de robo
      }, 1000)

    }, 1000)

  }, 1000)

})();