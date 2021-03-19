const axios = require("axios");
const cron = require("node-cron");
const relevantCoins = require("../config").relevantCoins;
const {
  getSecondsInMilis,
  getMinutesInMilis,
  getHoursInMilis,
  getDaysInMilis,
  ISODateString,
  JSONtoMap,
} = require("../func");
require("dotenv").config();

async function fetchSparkline(keys, periodInDays) {
  let startTime = new Date();
  startTime.setUTCDate(startTime.getUTCDate() - periodInDays);
  startTime.setUTCHours(startTime.getUTCHours() - 1);
  startTime = ISODateString(startTime);
  const apiURI = `${process.env.API_URL}/v1/currencies/sparkline?key=${process.env.API_KEY}&ids=${keys}&start=${startTime}`;
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

async function fetchSparklineSE(keys, startTime, endTime) {
  const apiURI = `${process.env.API_URL}/v1/currencies/sparkline?key=${process.env.API_KEY}&ids=${keys}&start=${startTime}&end=${endTime}`;
  return axios
    .get(apiURI)
    .then((response) => {
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

let dailySparkline;

async function setDailyData() {
  let data = await fetchSparkline(relevantCoins, 1);
  while (data == false) {
    await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(1)));
    data = await fetchSparkline(relevantCoins, 1);
  }
  dailySparkline = JSONtoMap(data);
  setInterval(async () => {
    let temp = await fetchSparkline(relevantCoins, 1);
    while (temp == false) {
      await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(1)));
      temp = await fetchSparkline(relevantCoins, 1);
    }
    dailySparkline = JSONtoMap(temp);
  }, getMinutesInMilis(10));
}

function getDailySparkline() {
  return dailySparkline;
}

let weeklySparkline;
let tempSparkline;

class SparklineOutline {
  constructor() {
    this.currency = "";
    this.timestamps = [];
    this.prices = [];
  }
}

async function weeklyHelper(startTime, endTime) {
  console.log(startTime, endTime);
  let data = await fetchSparklineSE(
    relevantCoins,
    ISODateString(startTime),
    ISODateString(endTime)
  );
  while (data == false) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    data = await fetchSparklineSE(
      relevantCoins,
      ISODateString(startTime),
      ISODateString(endTime)
    );
  }

  let len = data.length;
  let isFirstCall = Object.keys(tempSparkline).length === 0;

  for (let i = 0; i < len; i++) {
    if (isFirstCall) tempSparkline.push(new SparklineOutline());

    tempSparkline[i].currency = data[i].currency;

    tempSparkline[i].timestamps.push(data[i].timestamps[5]);
    tempSparkline[i].prices.push(data[i].prices[5]);

    tempSparkline[i].timestamps.push(data[i].timestamps[10]);
    tempSparkline[i].prices.push(data[i].prices[10]);

    tempSparkline[i].timestamps.push(data[i].timestamps[15]);
    tempSparkline[i].prices.push(data[i].prices[15]);
  }
}

async function setWeeklyData() {
  tempSparkline = [];

  let endTime = new Date();
  endTime.setUTCDate(endTime.getUTCDate() - 6);
  let startTime = new Date();
  startTime.setUTCDate(startTime.getUTCDate() - 7);
  startTime.setUTCHours(startTime.getUTCHours() - 1);

  for (let i = 0; i < 7; i++) {
    await weeklyHelper(startTime, endTime);
    endTime.setUTCDate(endTime.getUTCDate() + 1);
    startTime.setUTCDate(startTime.getUTCDate() + 1);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  weeklySparkline = JSONtoMap(tempSparkline);

  cron.schedule(
    "55 23 * * *",
    async () => {
      tempSparkline = [];

      let endTime = new Date();
      endTime.setUTCDate(endTime.getUTCDate() - 6);
      let startTime = new Date();
      startTime.setUTCDate(startTime.getUTCDate() - 7);
      startTime.setUTCHours(startTime.getUTCHours() - 1);

      for (let i = 0; i < 7; i++) {
        await weeklyHelper(startTime, endTime);
        endTime.setUTCDate(endTime.getUTCDate() + 1);
        startTime.setUTCDate(startTime.getUTCDate() + 1);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      weeklySparkline = JSONtoMap(tempSparkline);
    },
    {
      scheduled: true,
      timezone: "Europe/London",
    }
  );
}

function getWeeklySparkline() {
  return weeklySparkline;
}

let monthlySparkline;

async function setMonthlyData() {
  let data = await fetchSparkline(relevantCoins, 30);
  while (data == false) {
    await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(1.5)));
    data = await fetchSparkline(relevantCoins, 30);
  }
  monthlySparkline = JSONtoMap(data);
  setInterval(async () => {
    let temp = await fetchSparkline(relevantCoins, 30);
    while (temp == false) {
      await new Promise((resolve) =>
        setTimeout(resolve, getSecondsInMilis(1.5))
      );
      temp = await fetchSparkline(relevantCoins, 30);
    }
    monthlySparkline = JSONtoMap(temp);
  }, getHoursInMilis(24));
}

function getMonthlySparkline() {
  return monthlySparkline;
}

let yearlySparkline;

async function setYearlyData() {
  let data = await fetchSparkline(relevantCoins, 365);
  while (data == false) {
    await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(1.5)));
    data = await fetchSparkline(relevantCoins, 365);
  }
  yearlySparkline = JSONtoMap(data);
  setInterval(async () => {
    let temp = await fetchSparkline(relevantCoins, 365);
    while (temp == false) {
      await new Promise((resolve) =>
        setTimeout(resolve, getSecondsInMilis(1.5))
      );
      temp = await fetchSparkline(relevantCoins, 365);
    }
    yearlySparkline = JSONtoMap(temp);
  }, getHoursInMilis(36));
}

function getYearlySparkline() {
  return yearlySparkline;
}

async function initSparklineData() {
  setDailyData();
  await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(3)));
  setWeeklyData();
  await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(10)));
  setMonthlyData();
  await new Promise((resolve) => setTimeout(resolve, getSecondsInMilis(3)));
  setYearlyData();
}

module.exports = {
  initSparklineData,
  getDailySparkline,
  getWeeklySparkline,
  getMonthlySparkline,
  getYearlySparkline,
};
