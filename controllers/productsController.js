const createFakeProducts = require('../mocks/productsGenerator');

const getProducts = (req, res) => {
  let products = createFakeProducts(4);
  res.render('mainProducts', { products: products });
};

module.exports = getProducts;
