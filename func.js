function getDaysInMilis(days) {
  return getHoursInMilis(days * 24);
}

function getHoursInMilis(hours) {
  return getMinutesInMilis(hours * 60);
}

function getMinutesInMilis(minutes) {
  return getSecondsInMilis(minutes * 60);
}

function getSecondsInMilis(seconds) {
  return seconds * 1000;
}

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function JSONtoMap(json) {
  let map = new Map();
  for (key in json) {
    map.set(json[key].currency, json[key]);
  }
  return map;
}

module.exports = {
  getSecondsInMilis,
  getMinutesInMilis,
  getHoursInMilis,
  getDaysInMilis,
  ISODateString,
  JSONtoMap,
};
