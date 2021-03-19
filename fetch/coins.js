const axios = require("axios");
const { JSONtoMap, getSecondsInMilis } = require("../func");
const relevantCoins = require("../config").relevantCoins;
require("dotenv").config();

let rCD, rCDMap;

async function fetchCoinData(keys) {
  const apiURI = `${process.env.API_URL}/v1/currencies/ticker?key=${process.env.API_KEY}&ids=${keys}&interval=1d,7d,30d,1y,ytd`;
  return axios
    .get(apiURI)
    .then((response) => {
      console.log(Date.now(), response.status);
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

setInterval(async () => {
  let tempRes = await fetchCoinData(relevantCoins);
  while (tempRes == false) {
    await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(1.5)));
    tempRes = await fetchCoinData(relevantCoins);
  }
  rCD = tempRes;
  rCDMap = JSONtoMap(rCD);
}, getSecondsInMilis(10));

function getRCD() {
  return rCD;
}

function getRCDMap() {
  return rCDMap;
}

exports.getRCD = getRCD;
exports.getRCDMap = getRCDMap;
exports.fetchCoinData = fetchCoinData;
