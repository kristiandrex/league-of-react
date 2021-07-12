const fs = require("fs");
const fetch = require("node-fetch");
const core = require("@actions/core");

async function getLatestVersion() {
  const VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json";
  const response = await fetch(VERSIONS_URL);
  const versions = await response.json();
  return versions[0];
}

getLatestVersion()
  .then(async (latestVersion) => {
    const filename = `${latestVersion}.json`;

    if (fs.existsSync(`public/data/${filename}`)) {
      console.log(`Version ${latestVersion} it's already downloaded.`);
      return;
    }

    console.log(`Downloading version ${latestVersion}...`);

    const url = `http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/es_MX/champion.json`;
    const response = await fetch(url);
    const json = await response.json();

    const data = JSON.stringify({
      version: json.version,
      champions: Object.values(json.data)
    });

    await fs.promises.writeFile(`public/data/${filename}`, data);

    await fs.promises.copyFile(
      `public/data/${filename}`,
      "public/data/latest.json"
    );

    // Adding latest version to Github Actions output.
    core.setOutput("latestVersion", latestVersion);

    console.log(`Version ${latestVersion} successfully downloaded.`);
  })
  .catch((error) => console.error(error));
