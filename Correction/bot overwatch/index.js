const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
puppeteer.use(StealthPlugin());
args = process.argv;
if (!args[2]) {
    return console.log("Merci de mettre en paramètre le pseudo !")
}
resultAvatar = [];

let message = ""
    //true for hidden Chromium
puppeteer.launch({
    headless: false,
    args: [
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
    ]
}).then(async browser => {
    console.log('✷ Running browser..');
    const page = await browser.newPage()
    try {


        await page.goto('https://playoverwatch.com/en-us/search/');
        await page.type("[data-js='player_search']>.search-input", args[2]);

        await page.click("[data-js='player_search']>.button ");
        await page.waitForTimeout(1000);
        let avatarUrl = await page.evaluate(() => Array.from(document.querySelectorAll(".player-badge-icon"), element => element.getAttribute('style')));
        let resultAvatar = avatarUrl[0].split("\'")[1];


        message += args[2] + "\t" + '<img src="' + resultAvatar + '" alt="Avatar!https://playoverwatch.com/" width="40"/>  ' + "  \n\n";
        for (let i = 0; i < args[2].length; i++) {
            message += "_";
        }
        message += "  \n\n  ";
        await page.click(".player-badge-wrapper>a")
        await page.waitForTimeout(1500)

        let playerLevel = await page.evaluate('document.querySelector(".u-vertical-center").innerText')
        message += "Player level: " + playerLevel + " \n\n ";
        message += "\n\n";

        let gameWons = await page.evaluate('document.querySelector(".masthead-detail>span").innerText')
        message += gameWons + "  \n\n  ";
        message += "\n\n";

        message += "Top heroes quick play: " + "time played";
        message += "\n\n";

        message + "| n° | Avatar   |      Name      |  Time played |  " + " \n\n  ";
        message + "|:---|----------|:-------------:|------:|  " + " \n\n  ";
        cnt = 0;
        for (let p = 0; p < 10; p++) {
            cnt = p + 1
            heroAvatar = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000021']>.progress-category-item>.ProgressBar-thumb\")[" + p + "].getAttribute('src')");
            heroName = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000021']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-title\")[" + p + "].textContent");
            heroTime = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000021']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-description\")[" + p + "].textContent");
            message += "| " + cnt + ' | <img src="' + heroAvatar + '" width="15"/>' + ` |  ${heroName} | ${heroTime} |  ` + " \n\n  ";
        }
        message += "\n\n";

        await page.waitForTimeout(1000);
        await page.select(".dropdown>select", "Games Won")
        await page.type(".dropdown>.dropdown-text", "Games Won");

        // ANCHOR INFO Game win by hero
        message += "Top heroes quick play: " + "Won";
        message += "\n\n";

        message + "| n° | Avatar   |      Name      |  Won |  " + " \n\n  ";
        message + "|:---|----------|:-------------:|------:|  " + " \n\n  ";
        cnt = 0;

        for (let p = 0; p < 10; p++) {;
            cnt = p + 1

            heroAvatar = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000039']>.progress-category-item>.ProgressBar-thumb\")[" + p + "].getAttribute('src')");
            heroName = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000039']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-title\")[" + p + "].textContent");
            heroTime = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000039']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-description\")[" + p + "].textContent");
            message += "| " + cnt + ' | <img src="' + heroAvatar + '" width="15"/>' + ` |  ${heroName} | ${heroTime} |  ` + " \n\n  ";
        }
        message += "\n\n";
        await page.waitForTimeout(1000);

        await page.select(".dropdown>select", "Multikill - Best")

        // ANCHOR INFO "Multi Kill by hero
        message += "Top heroes quick play: " + "Multi Kill";
        message += "\n\n";

        message + "| n° | Avatar   |      Name      |  Multi Kill |  " + " \n\n  ";
        message + "|:---|----------|:-------------:|------:|  " + " \n\n  ";

        cnt = 0;
        for (let p = 0; p < 10; p++) {
            cnt = p + 1;

            heroAvatar = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000346']>.progress-category-item>.ProgressBar-thumb\")[" + p + "].getAttribute('src')");
            heroName = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000346']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-title\")[" + p + "].textContent");
            heroTime = await page.evaluate("document.querySelectorAll(\"#quickplay>section>div>[data-category-id='0x0860000000000346']>.progress-category-item>.ProgressBar-container>.ProgressBar-textWrapper>.ProgressBar-description\")[" + p + "].textContent");
            message += "| " + cnt + ' | <img src="' + heroAvatar + '" width="15"/>' + ` |  ${heroName} | ${heroTime} |  ` + " \n\n  ";
        }
        message += "\n\n";
        await page.waitForTimeout(1000)

        fs.appendFile('data/results👨🏼‍💻' + '.md', message + "  \n\n", 'utf8', function(err) {
            if (err) return console.log(err);
        });
    } catch {
        console.log("User or data not find");
    } finally {
        await browser.close();
        console.log("✨All done, check the console✨");
    }
});