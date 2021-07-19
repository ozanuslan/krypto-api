var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var coinsRouter = require('./routes/coins');
var sparklineRouter = require('./routes/sparkline');
var statsRouter = require('./routes/stats');

var sparklineFetcher = require('./fetch/sparkline');
var statsFetcher = require('./fetch/stats');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/coins', coinsRouter);
app.use('/sparkline', sparklineRouter);
app.use('/stats', statsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.app = app;

app.listen(process.env.PORT || 3000);

sparklineFetcher.initSparklineData();
statsFetcher.initStats();
