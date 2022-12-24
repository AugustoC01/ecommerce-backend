const bcrypt = require('bcrypt');

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const isValidPass = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

module.exports = { createHash, isValidPass };
