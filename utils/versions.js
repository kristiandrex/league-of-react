const fetch = require("node-fetch");

/**
 * Get champions of specific version
 * @param {string} version
 * @returns {Promise<IChampion[]>} Champions array
 */
async function fetchVersion(version) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`
  );
  const json = await response.json();
  return Object.values(json.data);
}

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

module.exports = {
  fetchVersion,
  getVersions
};
