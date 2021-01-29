const { VERSIONS_URL } = require("util/settings");

export async function getLastVersion() {
  const response = await fetch(VERSIONS_URL);
  const versions = await response.json();
  return versions[0];
}

export async function loadChampions(version) {
  const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`);
  const champions = await response.json();
  return champions.data;
}

export default async function loadFullData() {
  const lastVersion = await getLastVersion();
  return await loadChampions(lastVersion);

}