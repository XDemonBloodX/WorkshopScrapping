const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
var dateFormat = require("dateformat");

require("dotenv").config();
const COUNTRY = process.env.COUNTRY.split(',');

fs = require('fs');
var now = new Date();
const today = dateFormat(now, "HH-MM_dd-mm-yyyy");
const todayH = today.replace("-", "h");
puppeteer.use(StealthPlugin());
//true for hidden Chromium
puppeteer.launch({
    headless: true,
    args: [
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
    ]
}).then(async browser => {
    console.log('✷ Running browser..')

    //const COUNTRY = ["EmpireJamaicain", "Jamaique", "EmpireAdaman", "EmpireCentreAfricain", "CentreAfrique", "EmpireBelge", "Belgique", "EmpireKenyan", "Kenya", "EmpireCamerounais", "Cameroun", "ilesBalares", "EmpireNeoGuineen", "NouvelleGuinee", "EmpireIslandais", "Islande", "NouvelleCaledonie", "EmpireduHainan", "Hainan", "Zambie", "EmpireGroenlandais", "Groenland", "Touva", "EmpireMacedoinien", "Macedoine", "PortoRico", "EmpirePortoRicain"];

    const page = await browser.newPage()
    await page.goto('https://nationsglory.fr/server/blue/countries')
    await page.waitForTimeout(5500)
    const hrefs = await page.$$eval("tr > td > a", (list) => list.map((elm) => elm.href));
    const links = [];
    let message = "";
    hrefs.forEach(hf => {
        if (hf.startsWith('https://nationsglory.fr/country/blue/') == true) {
            links.push(hf)
        }
    });

    const linkLength = links.length / 2;
    for (let i = 0; i < linkLength; i++) {
        let pay = links[i].substring(37, links[i].length)

        await page.goto(links[i] + "/members")
        await page.waitForTimeout(500);

        console.log("n°" + i + " ☛\t Country: " + pay)

        data_last = "lol"
        if (COUNTRY.includes(pay)) {
            //true alors sa tourne
            while ("btn btn-block btn-secondary btn-lg d-none" != data_last) {
                //data_last = await page.evaluate(() => Array.from(document.getElementById("load_more_members").getAttribute("class")));

                if (await page.evaluate('document.querySelector("#load_more_members").getAttribute("class")') !== null) {
                    console.log("found");
                    data_last = await page.evaluate('document.querySelector("#load_more_members").getAttribute("class")')
                    await page.waitForTimeout(500);
                    try {
                        await page.click("#load_more_members");
                    } catch (error) {
                        console.log("cannot click on button more view members")
                    }
                } else {
                    console.log('not found');
                }
            }

            await page.waitForTimeout(500);
            const members = await page.evaluate(() => Array.from(document.querySelectorAll("#bodymembers > tr > td > a > div > span"), element => element.textContent));

            console.log("n°" + i + " 🌐 " + pay + " → ♟members: " + "\n" + "members: " + members + "\n")

            message = "🌐" + pay + "\n" + "members: \n[\"" + members + "\"] \n";

            fs.appendFile('countryHorde/results👨🏼‍💻' + todayH + '.txt', message, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        }
    }
    await browser.close();
    console.log("✨All done, check the console✨");
})