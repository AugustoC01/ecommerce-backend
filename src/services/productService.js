const { Factory } = require('../daos/mainDao');
const DaoFactory = new Factory();
const Products = DaoFactory.createDao('Products');

const getProducts = async (category) => {
  const products = await Products.getAll(category);
  const productsData = [];
  products.forEach((prod) => {
    if (prod.stock > 0) {
      productsData.push({
        id: prod._id,
        title: prod.title,
        price: prod.price,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
      });
    }
  });
  console.log(products);
  return productsData;
};

const getProduct = async (id) => {
  const product = await Products.getById(id);
  const productData = {
    id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    stock: product.stock,
    // timestamp: product.timestamp,
    // description: product.description,
    // code: product.code,
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
