'use strict';

const winston = require('winston');
const config = require('../config');
const loggingTransports = [];
const exceptionTransports = [];
const notProd = (config.env === 'development' || config.env === 'ci' || config.env === 'test');
const levels = {
  info: 0,
  email: 1,
  warn: 2,
  error: 3
};
const colors = {
  info: 'green',
  email: 'magenta',
  warn: 'yellow',
  error: 'red'
};

loggingTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    timestamp: true,
    colorize: true,
    stringify: obj => JSON.stringify(obj)
  })
);

exceptionTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    timestamp: true,
    colorize: true,
    stringify: obj => JSON.stringify(obj)
  })
);

const transports = {
  levels: levels,
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

if (notProd) {
  delete transports.exceptionHandlers;
}

const logger = new (winston.Logger)(transports);

winston.addColors(colors);

module.exports = logger;
