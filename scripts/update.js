const fs = require("fs");
const fetch = require("node-fetch");
const chalk = require("chalk");
const core = require("@actions/core");

const screenshots = require("./screenshots");

async function getVersions() {
  const url = "https://ddragon.leagueoflegends.com/api/versions.json";
  const response = await fetch(url);
  const versions = await response.json();

  return {
    latest: versions[0],
    previous: versions[1]
  };
}

getVersions()
  .then(async (versions) => {
    const latestVersion = versions.latest;
    const versionFile = "public/data/version.txt";

    if (!fs.existsSync(versionFile)) {
      return await update(versions);
    }

    const currentVersion = fs.readFileSync(versionFile).toString();

    if (latestVersion !== currentVersion) {
      return await update(versions);
    }

    core.setOutput("should-update", false);

    console.log(
      chalk.yellow(`Version ${latestVersion} it's already downloaded.`)
    );
  })
  .catch((error) => {
    console.error("There was an error");
    console.error(error);
  });

async function update(versions) {
  const latestVersion = versions.latest;

  console.log(chalk.cyan(`Downloading version ${latestVersion}...`));

  const latestData = await fetchVersion(latestVersion);
  const previousData = await fetchVersion(versions.previous);

  const newChampion = latestData.champions.find(
    (champion, index) => previousData.champions[index]?.id !== champion.id
  );

  const modifiedChampions = latestData.champions.map((champion) => ({
    new: champion.id === newChampion?.id,
    ...champion
  }));

  latestData.champions = modifiedChampions;
  const stringData = JSON.stringify(latestData);
  await fs.promises.writeFile("public/data/latest.json", stringData);
  await fs.promises.writeFile("public/data/version.txt", latestVersion);
  console.log(chalk.green(`Version ${latestVersion} successfully downloaded.`));

  await screenshots();

  core.setOutput("latest-version", latestVersion);
  core.setOutput("should-update", true);
}

function getVersionUrl(version) {
  return `http://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`;
}

function formatData(payload) {
  return {
    version: payload.version,
    champions: Object.values(payload.data)
  };
}

async function fetchVersion(version) {
  const response = await fetch(getVersionUrl(version));
  const json = await response.json();
  return formatData(json);
}
