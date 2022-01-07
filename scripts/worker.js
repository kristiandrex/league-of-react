"use strict";

const Vibrant = require("node-vibrant");

/**
 *
 * @param {{
 *  champion:IChampion
 *  newChampion: string,
 *  version: string
 * }} args

 * @returns {Promise<IChampion>}
 */
module.exports = async function ({ champion, newChampion, version }) {
  // eslint-disable-next-line no-unused-vars
  const { image, ...rest } = champion;
  const images = getChampionImages(champion.id, version);
  const palette = await Vibrant.from(images.thumbnail).getPalette();

  console.log(`${champion.id} ✅`);

  return {
    new: champion.id === newChampion,
    images,
    color: palette.Vibrant.hex,
    ...rest
  };
};

/**
 * Get champion images
 * @param {string} id
 * @param {string} version
 * @returns {{
 *  portrait: string,
 *  landscape: string,
 *  thumbnail: string
 * }} URL images
 */
function getChampionImages(id, version) {
  return {
    portrait: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`,
    landscape: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
    thumbnail: `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`
  };
}
