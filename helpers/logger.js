const winston = require('winston');

let logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ name: 'info-log', level: 'info' }),
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

const errorLogger = (error) => {
  const warnLogger = logger.transports.find((transport) => {
    return transport.level === 'warn';
  });
  logger.remove(warnLogger);
  logger.error(error);
};

const infoLogger = (req, res, next) => {
  logger.info(`Ruta: ${req.originalUrl} Metodo: ${req.method}`);
  next();
};

const notImplemented = (req, res) => {
  logger.warn(`Ruta: ${req.originalUrl} no existente. Metodo: ${req.method}`);
  res.status(404).json('Ruta no existente.');
};

module.exports = { logger, infoLogger, notImplemented, errorLogger };
