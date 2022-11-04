const winston = require('winston');

let logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({
      name: 'warn-log',
      filename: './logs/warn.log',
      level: 'warn',
    }),
    new winston.transports.File({
      name: 'error-log',
      filename: './logs/error.log',
      level: 'error',
    }),
  ],
});

module.exports = logger;
