"use strict";

const fs = require("fs");
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const core = require("@actions/core");
const { getVersions } = require("./util");

const SCREENSHOTS_FILE = "public/data/screenshots.txt";

/**
 * choose random champion
 * @returns {string} Champion ID
 */
function getRandomChampion() {
  const { champions } = require("../public/data/patch.json");
  const randomIndex = Math.floor(Math.random() * champions.length);
  return champions[randomIndex].id;
}

async function takeScreenshots(version) {
  const PAGE_URL = "https://league-of-react.vercel.app";

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 375,
      height: 667
    }
  });

  const page = await browser.newPage();
  await takeSingleScreenshot(page, PAGE_URL, "docs/images/home.png");

  const champion = getRandomChampion();
  await takeSingleScreenshot(
    page,
    `${PAGE_URL}/champions/${champion}`,
    "docs/images/champion.png"
  );

  await browser.close();
  await fs.promises.writeFile(SCREENSHOTS_FILE, version);
  core.setOutput("patch", version);
  core.setOutput("should-commit", true);
}

async function takeSingleScreenshot(page, url, path) {
  console.log(chalk.cyan(`Taking screenshot on ${url}`));
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 0
  });

  await page.screenshot({ path });
  console.log(chalk.green("Screenshot successfully"));
}

(async () => {
  try {
    const force = process.argv[2] === "--force";
    const { latest: latestVersion } = await getVersions();

    if (!fs.existsSync(SCREENSHOTS_FILE) || force) {
      return await takeScreenshots(latestVersion);
    }

    const latestScreenshot = fs.readFileSync(SCREENSHOTS_FILE).toString();

    if (latestScreenshot !== latestVersion) {
      return await takeScreenshots(latestVersion);
    }

    core.setOutput("should-commit", false);
    console.log(
      chalk.yellow(
        `The latest version ${latestScreenshot} hasn't changed. You can use --force flag for take the screenshots anyway`
      )
    );
  } catch (error) {
    console.error(error);
  }
})();
