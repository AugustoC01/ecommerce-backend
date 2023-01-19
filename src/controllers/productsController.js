const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const getAll = async (req, res) => {
  const { categoria } = req.params;
  const productsData = await getProducts(categoria);
  if (req.user.isAdmin) {
    return res.render("mainProducts", {
      productsData,
      isAdmin: true,
    });
  }
  res.render("mainProducts", {
    productsData,
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await getProduct(id);
    res.render("mainProd", { view: true, prod });
  } catch (error) {
    res.status(404).render("mainNotification", {
      action: "productos",
      msg: "Producto no encontrado",
      error: true,
    });
  }
};

const createProd = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const prod = req.body;
    await createProduct(prod);
  }
  res.status(200).redirect("/productos");
};

const updateProd = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const { id } = req.params;
    console.log(id);
    const prod = req.body;
    return await updateProduct(id, prod);
  }
  res.status(200).redirect("/productos");
};

const editProd = async (req, res) => {
  const { id } = req.params;
  const prod = await getProduct(id);
  res.status(200).render("mainProd", { edit: true, prod });
};

const newProd = (req, res) => {
  res.status(200).render("mainProd", { create: true });
};

const deleteProd = async (req, res) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const { id } = req.params;
    await deleteProduct(id);
  }
  res.status(200).redirect("/productos");
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
