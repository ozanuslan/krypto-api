const axios = require("axios");
const { JSONtoMap, getMinutesInMilis } = require("../func");
const relevantCoins = require("../config").relevantCoins;
require("dotenv").config();

let symbols = [];
const coinsSeperated = relevantCoins.split(",");
coinsSeperated.splice(coinsSeperated.indexOf("USDT"), 1);
coinsSeperated.forEach((key) => {
  symbols.push(key + "USDT");
});

async function fetchStats(keys) {
  const apiURI = `${process.env.BINANCE_URL}/api/v3/ticker/24hr?symbol=${keys}`;
  return axios
    .get(apiURI)
    .then((response) => {
      if (response.status != 200) {
        return false;
      }
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

let relevantStats = new Map();

async function initStats() {
  const len = Object.keys(symbols).length;
  for (let i = 0; i < len; i++) {
    let data = await fetchStats(symbols[i]);
    while (data == false) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      data = await fetchStats(symbols[i]);
    }
    relevantStats.set(coinsSeperated[i], data);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  setInterval(async () => {
    for (let i = 0; i < len; i++) {
      let data = await fetchStats(symbols[i]);
      while (data == false) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        data = await fetchStats(symbols[i]);
      }
      relevantStats.set(coinsSeperated[i], data);
    }
  }, getMinutesInMilis(5));
}

function getStats() {
  return relevantStats;
}

module.exports = { initStats, getStats };
