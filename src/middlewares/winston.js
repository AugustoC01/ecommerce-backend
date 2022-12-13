const winston = require('winston');
const path = require('path');

const loggerConfig = {
  transports: [
    new winston.transports.Console({ name: 'info-log', level: 'info' }),
    new winston.transports.File({
      name: 'warn-log',
      filename: path.join(__dirname, '../logs/warn.log'),
      level: 'warn',
    }),
    new winston.transports.File({
      name: 'error-log',
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
  ],
};

const logger = winston.createLogger(loggerConfig);

module.exports = { logger };
