const logger = require('../helpers/logger/logger');

const infoLogger = (req, res, next) => {
  logger.info(`Ruta: ${req.originalUrl} Metodo: ${req.method}`);
  next();
};

const notImplemented = (req, res) => {
  logger.warn(`Ruta: ${req.originalUrl} no existente. Metodo: ${req.method}`);
  res.status(404).json('Ruta no existente.');
};

const errorLogger = (error) => {
  const warnLogger = logger.transports.find((transport) => {
    return transport.level === 'warn';
  });
  logger.remove(warnLogger);
  logger.error(error);
};

module.exports = { infoLogger, notImplemented, errorLogger };
