const { errorLogger } = require('../helpers/logger');
const { Products } = require('../models/prodSchema');
const { sendSms } = require('../services/msgService');

let instance = null;
class ProductsDao {
  static getInstance() {
    if (!instance) instance = new ProductsDao();
    return instance;
  }

  // DEVUELVE TODOS LOS PRODUCTOS
  static async getAll() {
    try {
      return await Products.find({});
    } catch (e) {
      errorLogger(e);
    }
  }

  // DEVUELVE UN PRODUCTO O NULL SI NO ESTA
  static async getById(id) {
    try {
      return await Products.findById(id);
    } catch (e) {
      errorLogger(e);
    }
  }

  // GUARDA UN PRODUCTO NUEVO
  async save(prod) {
    try {
      prod.timestamp = new Date().toLocaleString();
      await Products.create(prod);
      return prod._id;
    } catch (e) {
      errorLogger(e);
    }
  }

  // MODIFICA UN PRODUCTO
  async updateById(id, body) {
    try {
      return await Products.updateOne({ _id: id }, { $set: body });
    } catch (e) {
      errorLogger(e);
    }
  }

  //  ELIMINA UN PRODUCTO POR ID
  async deleteById(id) {
    try {
      return await Products.findByIdAndDelete(id);
    } catch (e) {
      errorLogger(e);
    }
  }
}
module.exports = ProductsDao;
