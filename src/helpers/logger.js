const { logger } = require('../middlewares/winston');

const errorLogger = (error) => {
  const errorLogger = logger.transports.find((transport) => {
    return transport.level === 'error';
  });
  const warnLogger = logger.transports.find((transport) => {
    return transport.level === 'warn';
  });
  if (warnLogger) logger.remove(warnLogger);
  if (!errorLogger) logger.add(errorLogger);
  logger.error(error);
};

const warnLogger = (warn) => {
  const errorLogger = logger.transports.find((transport) => {
    return transport.level === 'error';
  });
  const warnLogger = logger.transports.find((transport) => {
    return transport.level === 'warn';
  });
  if (errorLogger) logger.remove(errorLogger);
  if (!warnLogger) logger.add(warnLogger);
  logger.warn(warn);
};

const infoLogger = (req, res, next) => {
  logger.info(`Ruta: ${req.originalUrl} Metodo: ${req.method}`);
  next();
};

const notImplemented = (req, res) => {
  warnLogger(`Ruta: ${req.originalUrl} no existente. Metodo: ${req.method}`);
  res.status(404).json('Ruta no existente.');
};

module.exports = {
  logger,
  infoLogger,
  notImplemented,
  errorLogger,
};
