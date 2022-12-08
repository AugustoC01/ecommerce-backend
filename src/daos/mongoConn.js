const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');
const { logger, errorLogger } = require('../helpers/logger');

const dbConn = () => {
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true })
    .then(logger.info('db conectada'))
    .catch((e) => errorLogger(e));
};

const dbDisconn = () => {
  mongoose.connection.close();
  logger.info('db desconectada');
};

module.exports = { dbConn, dbDisconn };
