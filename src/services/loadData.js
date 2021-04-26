async function getLastVersion() {
  const VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json";
  const response = await fetch(VERSIONS_URL);
  const versions = await response.json();
  return versions[0];
}

async function loadChampions(version) {
  const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion.json`);
  const champions = await response.json();
  return Object.values(champions.data);
}

export default async function loadData() {
  const lastVersion = await getLastVersion();
  const champions = await loadChampions(lastVersion);

  return {
    champions,
    version: lastVersion
  };
}
