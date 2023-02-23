const dotenv = require('dotenv');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const MeterDataCollector = require('./switchbot-collector/meter-data-collector');
const JsonDataStore = require('./switchbot-collector/json-data-store')

dotenv.config();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const datastore = new JsonDataStore();

app.get('/sync', function(req, res, next) {
  res.json(datastore.all());
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message, 
    status: err.status, 
  });
});

const collector = new MeterDataCollector(
  datastore,
  process.env.SWITCHBOT_TOKEN,
  process.env.SWITCHBOT_SECRET,
  process.env.SWITCHBOT_METOR_DEVICE_ID,
);
collector.activate();

module.exports = app;
