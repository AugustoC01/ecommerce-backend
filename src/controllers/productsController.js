const {
  getProducts,
  getProduct,
  createProduct,
} = require('../services/productService');

const getAll = async (req, res) => {
  const { categoria } = req.params;
  const productsData = await getProducts(categoria);
  res.render('mainProducts', {
    productsData,
    logued: true,
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const prod = await getProduct(id);
  console.log(prod);
  res.render('mainProducts', {
    productsData: prod,
    logued: true,
  });
};

const createProd = (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const prod = req.body;
    createProduct(prod);
  }
  res.status(200).redirect('/productos');
};

module.exports = { getAll, getOne, createProd };
