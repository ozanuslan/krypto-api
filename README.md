# Krypto API

### Introduction
Krypto-Api is a cryptocurrency data tracking api that utilizes NodeJS runtime and Express framework. Below you can see how you can see the endpoints of the server.
Live build of this project can be accessed on: http://krypto-api.herokuapp.com (Heroku puts apps on sleep if not used for a while, your first get reqest may take a while to get a response.)

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
