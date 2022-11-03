const createFakeProducts = require('../mocks/productsGenerator');

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).redirect('/login');
};

const getProducts = (req, res) => {
  let products = createFakeProducts(4);
  res.render('mainProducts', {
    products: products,
    name: req.user.username,
  });
};

const logout = (req, res) => {
  res.status(200).redirect('/logout');
};

module.exports = { getProducts, logout, checkAuth };
