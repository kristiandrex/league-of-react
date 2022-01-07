"use strict";

const puppeteer = require("puppeteer");
const chalk = require("chalk");
const core = require("@actions/core");

const { champions, version } = require("../public/data/latest.json");

/**
 *
 * @returns {string} Champion id
 */
function getRandomChampion() {
  const index = Math.floor(Math.random() * champions.length);
  return champions[index].id;
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 375,
        height: 667
      }
    });

    const page = await browser.newPage();
    const PAGE_URL = "https://league-of-react.vercel.app";

    console.log(chalk.cyan("Taking screenshot on /"));
    await page.goto(PAGE_URL, {
      waitUntil: "networkidle0",
      timeout: 0
    });

    await page.screenshot({ path: "docs/images/home.png" });
    console.log(chalk.green("Screenshot successfully"));

    const champion = getRandomChampion();
    console.log(chalk.cyan(`Taking screenshot on /champions/${champion}`));

    await page.goto(`${PAGE_URL}/champions/${champion}`, {
      waitUntil: "networkidle0",
      timeout: 0
    });

    await page.screenshot({ path: "docs/images/champion.png" });
    console.log(chalk.green("Screenshot successfully"));
    await browser.close();
    core.setOutput("latest-version", version);
  } catch (error) {
    console.error(error);
  }
})();
