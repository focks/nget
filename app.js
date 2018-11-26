var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var ERRORS = require('./errors');

var router = require('./router/index');


// var queryMiddleware = require('./middlewares/query');

var app = express();


app.use(logger('dev'));
app.use(express.json());

// will be used for health checkup. if main process dies kubernetes will restart the container
app.use('/health', (req, res, next) => {
  res.json({status: "ok"})
});

// app.use(queryMiddleware);
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.json({message: "resource not found"})
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(ERRORS.SERVER_ERROR_MESSAGE);
  // res.send(res.locals.message);
});

module.exports = app;
