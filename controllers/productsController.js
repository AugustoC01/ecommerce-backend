const createFakeProducts = require('../mocks/productsGenerator');

const getProducts = (req, res) => {
  let products = createFakeProducts(4);
  res.render('mainProducts', {
    products: products,
    name: req.session.name,
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).redirect('http://localhost:8080/logout');
};

module.exports = { getProducts, logout };
