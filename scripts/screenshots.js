const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const chalk = require("chalk");

const { champions } = require("../public/data/latest.json");

function logProcess(child) {
  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  child.stderr.on("data", (data) => {
    console.error(data.toString());
  });
}

async function run() {
  await new Promise((resolve, reject) => {
    const build = spawn("npm", ["run", "build"]);

    build.on("close", (code) => {
      console.log(`Build process close all stdio with code ${code}`);
      resolve(code);
    });

    build.on("error", (err) => {
      reject(err);
    });

    logProcess(build);
  });

  const server = spawn("npm", ["run", "start"]);

  server.on("close", (code) => {
    console.log(`Build process close all stdio with code ${code}`);
  });

  server.on("error", (err) => {
    console.error(err);
  });

  logProcess(server);

  await takeScreenshots();
  server.kill();
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
    await page.goto("http://127.0.0.1:3000/", {
      waitUntil: "networkidle0",
      timeout: 0
    });
    await page.screenshot({ path: "docs/images/home.png" });
    console.log(chalk.green("Screenshot successfully"));

    console.log(chalk.cyan(`Taking screenshot on /champions/${champion}`));
    await page.goto(`http://127.0.0.1:3000/champions/${champion}`, {
      waitUntil: "networkidle0",
      timeout: 0
    });

    await page.screenshot({ path: "docs/images/champion.png" });
    console.log(chalk.green("Screenshot successfully"));

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

function getRandomChampion() {
  const index = Math.floor(Math.random() * champions.length);
  return champions[index].id;
}

run();
