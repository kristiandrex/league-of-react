const fs = require("fs");
const fetch = require("node-fetch");
const chalk = require("chalk");
const core = require("@actions/core");
const Vibrant = require("node-vibrant");

let LATEST_URL;

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

  LATEST_URL = `http://ddragon.leagueoflegends.com/cdn/${latest}`;

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

  const champions = [];

  for (const iterator of latestChamps) {
    const champion = await formatChampion(iterator, newChampion);
    champions.push(champion);
    console.log(`${champion.name} ✅`);
  }

  await fs.promises.writeFile(
    "public/data/latest.json",
    JSON.stringify({ version: latest, champions })
  );

  await fs.promises.writeFile("public/data/version.txt", latest);
  console.log(chalk.green(`Version ${latest} successfully downloaded.`));

  core.setOutput("latest-version", latest);
  core.setOutput("should-update", true);
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

/**
 * Get portrait and landscape champion images
 * @param {string} id Champion id
 * @returns {{portrait: string, landscape: string}} URL portrait and landscape images
 */
function getChampionImages(id) {
  return {
    portrait: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`,
    landscape: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
    thumbnail: `${LATEST_URL}/img/champion/${id}.png`
  };
}

/**
 *
 * @param {IChampion} champion
 * @param {string} newChampionID
 * @returns
 */
async function formatChampion(champion, newChampionID) {
  {
    // eslint-disable-next-line no-unused-vars
    const { image, ...rest } = champion;
    const images = getChampionImages(champion.id);
    const palette = await Vibrant.from(images.landscape).getPalette();

    return {
      new: champion.id === newChampionID,
      images,
      color: palette.Muted.hex,
      ...rest
    };
  }
}

(async () => {
  try {
    const versions = await getVersions();

    const { latest } = versions;
    const versionFile = "public/data/version.txt";

    if (!fs.existsSync(versionFile)) {
      return await update(versions);
    }

    const currentVersion = fs.readFileSync(versionFile).toString();

    if (latest !== currentVersion) {
      return await update(versions);
    }

    core.setOutput("should-update", false);
    console.log(chalk.yellow(`Version ${latest} it's already downloaded.`));
  } catch (error) {
    console.error(error);
  }
})();
