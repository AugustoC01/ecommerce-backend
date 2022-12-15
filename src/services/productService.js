const { Factory } = require('../daos/mainDao');
const DaoFactory = new Factory();
const Products = DaoFactory.createDao('Products');

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
  const product = await Products.getById(id);
  const productData = {
    id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  };
  return productData;
};

const createProduct = async (prod) => {
  const id = await Products.save(prod);
  return id;
};

const updateProduct = async (id, data) => {
  await Products.updateById(id, data);
};

const deleteProduct = async (id) => {
  await Products.deleteById(id);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
