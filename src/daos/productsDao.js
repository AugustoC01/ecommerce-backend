const { logger } = require('../helpers/logger');
const { Products } = require('../models/prodSchema');

// GUARDA PRODUCTOS NUEVOS
const save = async (prod) => {
  try {
    prod.timestamp = new Date().toLocaleString();
    const newProd = await Products.create(prod);
    const id = newProd._id;
    return id;
  } catch (e) {
    errorLogger(e);
  }
};

// DEVUELVE TODOS LOS PRODUCTOS
const getAll = async () => {
  try {
    return await Products.find({});
  } catch (e) {
    errorLogger(e);
  }
};

// DEVUELVE UN PRODUCTO O NULL SI NO ESTA
const getById = async (id) => {
  try {
    return await Products.findById(id);
  } catch (e) {
    errorLogger(e);
  }
};

// MODIFICA UN PRODUCTO
const updateById = async (id, body) => {
  try {
    return await Products.updateOne({ _id: id }, { $set: body });
  } catch (e) {
    errorLogger(e);
  }
};

//  ELIMINA UN PRODUCTO POR ID
const deleteById = async (id) => {
  try {
    return await Products.findByIdAndDelete(id);
  } catch (e) {
    errorLogger(e);
  }
};

module.exports = { save, getAll, getById, updateById, deleteById };
