const { getProducts, getProduct } = require('../services/productService');

const getAllProducts = async (req, res) => {
  const { name } = req.user;
  const { category } = req.params;
  const productsData = await getProducts(category);
  res.render('mainProducts', {
    productsData,
    name,
    logued: true,
  });
};

module.exports = { getAllProducts };
