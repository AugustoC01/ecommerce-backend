const { errorLogger } = require('../helpers/logger');
const { Products } = require('../models/prodSchema');

class ProductsDao {
  // GUARDA UN PRODUCTO NUEVO
  async save(prod) {
    try {
      prod.timestamp = new Date().toLocaleString();
      return await Products.create(prod);
    } catch (e) {
      errorLogger(e);
    }
  }

  // DEVUELVE TODOS LOS PRODUCTOS
  async getAll() {
    try {
      return await Products.find({});
    } catch (e) {
      errorLogger(e);
    }
  }

  // DEVUELVE UN PRODUCTO O NULL SI NO ESTA
  async getById(id) {
    try {
      return await Products.findById(id);
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

/* let instance = null;
class Singleton {
  constructor() {
    this.value = Math.random();
  }
  printValue() {
    console.log(this.value);
  }
  static getInstance() {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  }
} 

const mySingleton = Singleton.getInstance()
*/
