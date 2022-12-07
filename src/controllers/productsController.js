const { getProducts } = require('../services/productService');

const getAllProducts = async (req, res) => {
  const productsData = await getProducts();
  const { name } = req.user;
  res.render('mainProducts', {
    productsData,
    name,
    logued: true,
  });
};

module.exports = { getAllProducts };
