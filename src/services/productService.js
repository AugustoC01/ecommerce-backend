const { ProductsDao } = require('../daos/mainDao');
const Products = new ProductsDao();

const getProducts = async () => {
  const products = await Products.getAll();
  const productsData = products.map((prod) => {
    return {
      id: prod._id,
      title: prod.title,
      price: prod.price,
      thumbnail: prod.thumbnail,
      // timestamp: prod.timestamp,
      // description: prod.description,
      // code: prod.code,
      // stock: prod.stock,
    };
  });
  return productsData;
};

const getProduct = async (id) => {
  return await Products.getById(id);
};

module.exports = { getProducts, getProduct };
