const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
args = process.argv;
const { help, log } = require('npm-colorlog');

puppeteer.use(StealthPlugin());

//true for hidden Chromium
puppeteer.launch({
    headless: false,
    args: ["--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"]
}).then(async browser => {
    log('✷ Running browser..', 'blue')
    const page = await browser.newPage()
    try {
        await page.goto('https://euw.leagueoflegends.com/fr-fr/champions/' + args[2].toLowerCase())
        await page.click(".style__Desc-sc-1o884zt-9>p>button")
        heroDescription = await page.evaluate("document.querySelector('.style__Desc-sc-1o884zt-9>p').innerText");
        log("\n\n" + "Description de " + args[2] + " : " + "\n\n" + heroDescription + "\n\n", 'magenta');
    } catch (error) {
        log('error', 'red')
    }
    await page.waitForTimeout(1000)
    await browser.close()
    log("✨All done, check the console✨", 'green');
})