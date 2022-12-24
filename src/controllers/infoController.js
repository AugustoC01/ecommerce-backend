const { getInfo } = require('../services/infoService');

const showInfo = (req, res) => {
  const data = getInfo();
  res.status(200).render('mainInfo', data);
};

module.exports = { showInfo };
