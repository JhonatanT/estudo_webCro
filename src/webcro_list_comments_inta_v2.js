
const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {


  async function loadMore(page, selector) {
    const moreB = await page.$(selector)
    if (moreB) {
      console.log("MORE")
      await moreB.click()
      await page.waitForSelector(selector, { timeout: 3000 }).catch(() => { console.log("timeout") })
      await loadMore(page, selector)
    }
  }
  async function getComment(page, selector) {
    const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
    return comments
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  setTimeout(async () => {

    await page.type('[name="username"]', "")
    await page.type('[name="password"]', "")
    await page.click('[type="submit"]')

    await page.waitForNavigation();

    await page.goto('https://www.instagram.com/p/CVRDh1pr0Hi/');

    await loadMore(page, 'div .qF0y9.Igw0E.IwRSH.YBx95._4EzTm.NUiEW')
    const arrobas = await getComment(page, '.C4VMK span a')
    const counted = count(arrobas)
    const sorted = sort(counted)
    sorted.forEach(arroba => { console.log(arroba) })
    console.log(arrobas)

    function count(arrobas) {
      const count = {}
      arrobas.forEach(arroba => { count[arroba] = (count[arroba] || 0) + 1 })
      return count
    }
    function sort(counted) {
      const entries = Object.entries(counted)
      const sorted = entries.sort((a, b) => b[1] - a[1])
      return sorted
    }

    fs.writeFile('nomes_posts.json', JSON.stringify(sorted, null, 2), err => {
      if (err) throw new Error("Algo deu ruim")
      console.log("SALVOU MLKOTE")
    })

    //await browser.close();
  }, 1000);
})();