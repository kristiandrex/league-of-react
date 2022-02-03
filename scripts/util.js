"use strict";

const fetch = require("node-fetch");

/**
 * Get the lastest two versions of LoL
 * @returns {Promise<Versions>} Two latest versions
 */
async function getVersions() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const [latest, previous] = await response.json();
  return { latest, previous };
}

module.exports = { getVersions };
