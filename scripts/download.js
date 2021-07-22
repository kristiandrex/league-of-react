const fs = require("fs");
const fetch = require("node-fetch");
const core = require("@actions/core");

async function getLatestVersion() {
  const url = "https://ddragon.leagueoflegends.com/api/versions.json";
  const response = await fetch(url);
  const versions = await response.json();
  return versions[0];
}

getLatestVersion()
  .then(async (latestVersion) => {
    if (!fs.existsSync("public/data/version.txt")) {
      return await download(latestVersion);
    }

    const currentVersion = fs
      .readFileSync("public/data/version.txt")
      .toString();

    if (latestVersion === currentVersion) {
      core.setOutput("should-update", false);
      console.log(`Version ${latestVersion} it's already downloaded.`);
      return;
    }

    await download(latestVersion);
  })
  .catch((error) => {
    console.error("There was an error");
    console.error(error);
  });

async function download(version) {
  console.log(`Downloading version ${version}...`);

  const url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`;
  const response = await fetch(url);
  const json = await response.json();

  const data = JSON.stringify({
    version,
    champions: Object.values(json.data)
  });

  await fs.promises.writeFile("public/data/latest.json", data);
  await fs.promises.writeFile("public/data/version.txt", version);

  // Adding latest version to Github Actions output.
  core.setOutput("latest-version", version);
  core.setOutput("should-update", true);

  console.log(`Version ${version} successfully downloaded.`);
}
