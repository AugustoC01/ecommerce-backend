const chat = (req, res) => {
  res.status(200).render('mainChat');
};

module.exports = { chat };
