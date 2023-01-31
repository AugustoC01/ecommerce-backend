const {
  getCartData,
  addProd,
  removeProd,
  removeAll,
  handleCart,
} = require("../services/cartService");

const addToCart = async (req, res) => {
  let { cartId, _id: userId } = req.user;
  const { prodId } = req.params;
  const { quantity } = req.body;
  await addProd(cartId, userId, prodId, quantity);
  res.status(200).redirect("/productos");
};

const getCart = async (req, res) => {
  const { cartId } = req.user;
  const data = await getCartData(cartId);
  res.status(200).render("mainCart", data);
};

const deleteCart = async (req, res) => {
  const { cartId } = req.user;
  await removeAll(cartId);
  res.status(200).redirect("/carrito");
};

const sendCart = async (req, res) => {
  const { name, email, cartId } = req.user;
  const order = await handleCart(name, email, cartId);
  if (order) {
    return res.status(200).render("mainNotification", {
      action: "carrito",
      msg: order.message,
      error: true,
    });
  }
  res.status(200).render("mainNotification", {
    action: "productos",
    msg: "Compra realizada",
  });
};

const removeFromCart = async (req, res) => {
  const { prodId } = req.params;
  const { cartId } = req.user;
  await removeProd(cartId, prodId);
  res.status(200).redirect("/productos");
};

module.exports = { getCart, sendCart, addToCart, deleteCart, removeFromCart };
