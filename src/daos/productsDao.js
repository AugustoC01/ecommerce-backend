const { checkValue } = require('../helpers/checkValue');
const { errorLogger } = require('../helpers/logger');
const { Products } = require('../models/prodSchema');

let instance = null;
class ProductsDao {
  static getInstance() {
    if (!instance) instance = new ProductsDao();
    return instance;
  }

  async getAll(category) {
    try {
      if (category) {
        return await Products.find({ category: category });
      }
      return await Products.find({});
    } catch (e) {
      errorLogger(e);
    }
  }

  async getById(id) {
    try {
      return await Products.findById(id);
    } catch (e) {
      errorLogger(e);
    }
  }

  async save(prod) {
    try {
      ProductsDao.validate(true, prod);
      prod.timestamp = new Date().toLocaleString();
      await Products.create(prod);
      return prod._id;
    } catch (e) {
      errorLogger(e);
    }
  }

  async updateById(id, body) {
    try {
      ProductsDao.validate(false, body);
      return await Products.updateOne({ _id: id }, { $set: body });
    } catch (e) {
      errorLogger(e);
    }
  }

  async deleteById(id) {
    try {
      return await Products.findByIdAndDelete(id);
    } catch (e) {
      errorLogger(e);
    }
  }

  //TIRA ERROR SI FALTA ALGUN DATO O SI EL TIPO DE DATO ES INCORRECTO
  static validate(required, prod) {
    const obj = {
      title: checkValue(required, prod.title, 'string'),
      price: checkValue(required, prod.price, 'number'),
      thumbnail: checkValue(required, prod.thumbnail, 'string'),
      description: checkValue(required, prod.description, 'string'),
      code: checkValue(required, prod.code, 'string'),
      stock: checkValue(required, prod.stock, 'number'),
    };
    for (const i in obj) {
      if (obj[i]) throw obj[i];
    }
  }
}

module.exports = ProductsDao;
