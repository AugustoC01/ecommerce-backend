const { getAll } = require('../daos/productsDao');

const getProducts = async (req, res) => {
  let products = await getAll();
  const productsData = products.map((prod) => {
    return {
      id: prod._id,
      title: prod.title,
      price: prod.price,
      thumbnail: prod.thumbnail,
      timestamp: prod.timestamp,
      description: prod.description,
      code: prod.code,
      stock: prod.stock,
    };
  });
  const { name, cartId } = req.user;
  res.render('mainProducts', {
    productsData,
    name,
    cartIdUrl: `/api/cart/${cartId}`,
    logued: true,
  });
};

module.exports = { getProducts };
