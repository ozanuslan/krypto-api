# Krypto API

### Currently Supported Coins
+ BTC
+ ADA
+ ATOM
+ DASH
+ DOT
+ EOS
+ ETH
+ LINK
+ LTC
+ NEO
+ TRX
+ USDT
+ XLM
+ XRP
+ XTZ

### Coins
/coins/COIN_ID returns general information and periodic change of the specified coin.

___Example Usage___
+ /coins/relevant => returns the information for all supported coins.
+ /coins/BTC
+ /coins/BTC,ETH,ADA

### Sparkline
/sparkline/daily/COIN_ID returns prices and timestamps in the last 24 hrs.\
/sparkline/weekly/COIN_ID returns prices and timestamps in the last 7 days.\
/sparkline/monthly/COIN_ID returns prices and timestamps in the last 30 days.\
/sparkline/yearly/COIN_ID returns prices and timestamps in the last 365 days.

___Example Usage___
+ /sparkline/daily/TRX
+ /sparkline/monthly/XLM

### Stats
/stats/COIN_ID returns specific statistics such as 24hr high and low.

___Example Usage___
+ /stats/DOT
