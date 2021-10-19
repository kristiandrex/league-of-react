const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const chalk = require("chalk");

const { champions } = require("../public/data/latest.json");

async function init() {
  console.log(chalk.cyan("Running server"));
  const child = spawn("npm", ["run", "dev"]);

  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  child.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  child.on("error", (error) => {
    console.error(`error: ${error.message}`);
  });

  child.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  await takeScreenshots();

  child.kill("SIGTERM");
  process.exit(0);
}

async function takeScreenshots() {
  try {
    const champion = getRandomChampion();

    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 375,
        height: 667
      }
    });

    const page = await browser.newPage();

    console.log(chalk.cyan("Taking screenshot on /"));
    await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });
    await page.screenshot({ path: "docs/images/home.png" });
    console.log(chalk.green("Screenshot successfully"));

    console.log(chalk.cyan(`Taking screenshot on /champions/${champion}`));
    await page.goto(`http://localhost:3000/champions/${champion}`, {
      waitUntil: "networkidle2"
    });

    await page.screenshot({ path: "docs/images/champion.png" });
    console.log(chalk.green("Screenshot successfully"));

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

function getRandomChampion() {
  const index = Math.floor(Math.random() * (champions.length + 1));
  return champions[index].id;
}

module.exports = init;
