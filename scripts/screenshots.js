"use strict";

import fs from "fs";
import puppeteer from "puppeteer";
import chalk from "chalk";
import core from "@actions/core";

import { getVersions, fetchVersion } from "../utils/versions.js";

const VERSION_FILE = "public/data/version.txt";

/**
 *
 * @returns {Promise<string>} Champion id
 */
async function getRandomChampion(version) {
  const champions = await fetchVersion(version);
  const index = Math.floor(Math.random() * champions.length);
  return champions[index].id;
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

  console.log(chalk.cyan(`Taking screenshot on ${PAGE_URL}/`));
  await page.goto(PAGE_URL, {
    waitUntil: "networkidle0",
    timeout: 0
  });

  await page.screenshot({ path: "docs/images/home.png" });
  console.log(chalk.green("Screenshot successfully"));

  const champion = await getRandomChampion(version);
  console.log(
    chalk.cyan(`Taking screenshot on ${PAGE_URL}/champions/${champion}`)
  );

  await page.goto(`${PAGE_URL}/champions/${champion}`, {
    waitUntil: "networkidle0",
    timeout: 0
  });

  await page.screenshot({ path: "docs/images/champion.png" });
  await browser.close();
  console.log(chalk.green("Screenshot successfully"));

  await fs.promises.writeFile(VERSION_FILE, version);
  core.setOutput("latest-version", version);
  core.setOutput("should-commit", true);
}

(async () => {
  try {
    const { latest } = await getVersions();
    const force = process.argv[2] === "--force";

    if (!fs.existsSync(VERSION_FILE) || force) {
      return await takeScreenshots(latest);
    }

    const currentVersion = fs.readFileSync(VERSION_FILE).toString();

    if (currentVersion !== latest) {
      return await takeScreenshots(latest);
    }

    core.setOutput("should-commit", false);
    console.log(
      chalk.yellow(
        `The latest version ${currentVersion} hasn't changed. You can use --force flag for take the screenshots anyway`
      )
    );
  } catch (error) {
    console.error(error);
  }
})();
