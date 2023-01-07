const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../services/productService');

const getAll = async (req, res) => {
  const { categoria } = req.params;
  const productsData = await getProducts(categoria);
  if (req.user.isAdmin) {
    return res.render('mainProducts', {
      productsData,
      logued: true,
      isAdmin: true,
    });
  }
  res.render('mainProducts', {
    productsData,
    logued: true,
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await getProduct(id);
    res.render('mainProd', { logued: true, view: true, prod });
  } catch (error) {
    res.status(404).render('mainError', {
      errorAction: 'productos',
      errorMsg: 'Producto no encontrado',
    });
  }
};

const createProd = async (req, res) => {
  const { isAdmin } = req.user;
  // if (isAdmin) {
  const prod = req.body;
  await createProduct(prod);
  // }
  res.status(200).redirect('/productos');
};

const updateProd = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const { id } = req.params;
    console.log(id);
    const prod = req.body;
    return await updateProduct(id, prod);
  }
  res.status(200).redirect('/productos');
};

const editProd = async (req, res) => {
  const { id } = req.params;
  let prod = await getProduct(id);
  res.status(200).render('mainProd', { logued: true, edit: true, prod });
};

const newProd = (req, res) => {
  res.status(200).render('mainProd', { logued: true, create: true });
};

const deleteProd = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const { id } = req.params;
    await deleteProduct(id);
  }
  res.status(200).redirect('/productos');
};

module.exports = {
  getAll,
  getOne,
  createProd,
  updateProd,
  deleteProd,
  editProd,
  newProd,
};
