const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');
const { logger, errorLogger } = require('../helpers/logger');

const dbConnect = () => {
  try {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    logger.info('db conectada');
  } catch (e) {
    console.log('no conecto');
    errorLogger(e);
  }
};

const dbDisconnect = () => {
  try {
    mongoose.connection.close();
    logger.info('db desconectada');
  } catch (e) {
    errorLogger(e);
  }
};

module.exports = { dbConnect, dbDisconnect };
