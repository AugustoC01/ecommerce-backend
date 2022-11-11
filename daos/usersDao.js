const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');
const { errorLogger } = require('../controllers/helperController');

const usersDb = mongoose
  .connect(MONGO_URL)
  // .then(() => console.log('Connected to DB'))
  .catch((e) => {
    // console.error(e);
    errorLogger(e.message);
    throw 'can not connect to the db';
  });

module.exports = usersDb;
