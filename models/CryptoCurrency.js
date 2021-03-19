const mongoose = require("mongoose");

const CryptoCurrencySchema = new mongoose.Schema({
  id: String,
  currency: String,
  symbol: String,
  name: String,
  logo_url: String,
  status: String,
  price: String,
  price_date: String,
  price_timestamp: String,
  circulating_supply: { String, default: String },
  max_supply: { String, default: String },
  market_cap: String,
  num_exchanges: String,
  num_pairs: String,
  num_pairs_unmapped: String,
  first_candle: String,
  first_trade: String,
  first_order_book: String,
  rank: String,
  rank_delta: String,
  high: String,
  high_timestamp: String
});

module.export = mongoose.model('coins', CryptoCurrencySchema);
