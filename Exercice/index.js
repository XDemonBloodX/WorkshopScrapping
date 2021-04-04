const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


puppeteer.use(StealthPlugin());

//true for hidden Chromium
puppeteer.launch({
    headless: false,
    args: [ //your user agent
    ]
}).then(async browser => {
    console.log('✷ Running browser..')
    const page = await browser.newPage()
    await page.goto('')
    await page.waitForTimeout(5000)


    await browser.close()
    console.log("✨All done, check the console✨");
})