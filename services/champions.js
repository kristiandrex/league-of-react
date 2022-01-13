import { differenceBy } from "lodash";
import { getVersions, fetchVersion } from "@/utils/versions";

export async function getAllChampions() {
  const { latest, previous } = await getVersions();

  const latestChamps = await fetchVersion(latest);
  const previousChamps = await fetchVersion(previous);
  const newChampions = differenceBy(latestChamps, previousChamps, "id");

  const champions = latestChamps.map((champion) => {
    const { id, name } = champion;
    const thumbnail = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;
    const isNew = newChampions.some((iterator) => iterator.id === id);

    return {
      id,
      name,
      thumbnail,
      new: isNew
    };
  });

  return champions;
}

export async function getChampion(id) {
  const { latest } = await getVersions();

  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latest}/data/es_MX/champion/${id}.json`
  );
  const json = await response.json();
  const champion = json.data[id];
  const { name, title, lore } = champion;

  return {
    id,
    name,
    title,
    lore,
    images: getSplashArts(champion)
  };
}

function getSplashArts(champion) {
  const { id } = champion;

  return champion.skins.map(
    (skin) =>
      `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`
  );
}
