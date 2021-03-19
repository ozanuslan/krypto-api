const express = require("express");
const router = express.Router();
const axios = require("axios");
//const mongoose = require("mongoose");
const coinFetcher = require("../fetch/coins");
//const Coin = require("../models/CryptoCurrency");
/**
 * TODO: DITCH MONGOCLIENT AND USE MONGOOSE,
 * CREATE COIN SCHEMA, PARSE INCOMING JSON,
 * ADD DATE CHECK FOR LAST INSERTED DATA => UPDATE IF DATA IS OLDER THAN 30s
 */
//const mongoURI = `mongodb+srv://coindb:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}.dncbw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

require("dotenv").config();

router.get("/relevant", async (req, res) => {
  res.send(coinFetcher.getRCD());
});

router.get("/:id", async (req, res) => {
  if(coinFetcher.getRCDMap().has(req.params.id)){
    res.send(coinFetcher.getRCDMap().get(req.params.id));
  } else {
    let data = await coinFetcher.fetchCoinData(req.params.id);
    while(data == false){
      await new Promise((resolve) => setTimeout(resolve, 300));
      data = await coinFetcher.fetchCoinData(req.params.id);
    }
    res.send(data);
  }
});

module.exports = router;
