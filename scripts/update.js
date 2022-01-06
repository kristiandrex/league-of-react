const { promises: fs } = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const chalk = require("chalk");
const core = require("@actions/core");
const Piscina = require("piscina");

/**
 * Two latest LoL versions
 * @typedef {{latest: string, previous: string}} Versions
 */

/**
 * Get the lastest two versions of LoL
 * @returns {Promise<Versions>} Two latest versions
 */
async function getVersions() {
  const url = "https://ddragon.leagueoflegends.com/api/versions.json";
  const response = await fetch(url);
  const [latest, previous] = await response.json();

  return { latest, previous };
}

/**
 * Update champions data
 * @param {Versions} versions
 */
async function update(versions) {
  const { latest, previous } = versions;

  console.log(chalk.cyan(`Downloading version ${latest}`));
  const latestChamps = await fetchChampions(latest);
  const previousChamps = await fetchChampions(previous);

  const newChampion = latestChamps.find(
    (champion, index) => previousChamps[index]?.id !== champion.id
  );

  const piscina = new Piscina({
    filename: path.resolve(__dirname, "worker.js")
  });

  const champions = await Promise.all(
    latestChamps.map((champion) =>
      piscina.run({ champion, newChampion, version: latest })
    )
  );

  await fs.writeFile(
    "public/data/latest.json",
    JSON.stringify({ version: latest, champions })
  );

  core.setOutput("latest-version", latest);
  core.setOutput("should-update", true);
  console.log(chalk.green(`Version ${latest} successfully downloaded.`));
}

/**
 *
 * @param {string} version
 * @returns {string} URL version
 */
function getVersionUrl(version) {
  return `http://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`;
}

/**
 * Get champions of specific version
 * @param {string} version
 * @returns {Promise<IChampion[]>} Champions array
 */
async function fetchChampions(version) {
  const response = await fetch(getVersionUrl(version));
  const json = await response.json();
  return Object.values(json.data);
}

(async () => {
  try {
    const versions = await getVersions();
    await update(versions);
  } catch (error) {
    console.error(error);
  }
})();
