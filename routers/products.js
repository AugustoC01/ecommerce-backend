const express = require('express');
const productsDao = require('../daos/mainDao');
const prodRouter = express.Router();

const products = new productsDao();
const isAdmin = true;

prodRouter.get('/', async (req, res) => {
  const productsData = await products.getAll();
  /* productsData.length === 0
    ? res.json({ msg: 'No hay productos disponibles' })
    : res.json(productsData); */
  console.log(productsData);
});

prodRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await products.getById(id);
    if (productData) {
      res.json(productData);
    }
  } catch (error) {
    if (TypeError) {
      res.json({ msg: 'Producto no encontrado' });
    } else {
      console.log(error);
    }
  }
});

prodRouter.post(
  '/',
  (req, res, next) => {
    if (isAdmin) {
      next();
    } else {
      res.json({ error: -1, descripcion: `Post /api/products no autorizado` });
    }
  },
  async (req, res) => {
    const { body } = req;
    body.id = await products.getNewId();
    body.timestamp = new Date().toLocaleString();
    await products.save(body);
    res.json({ msg: 'Producto creado', prod: body });
  }
);

prodRouter.put(
  '/:id',
  (req, res, next) => {
    if (isAdmin) {
      next();
    } else {
      res.json({ error: -1, descripcion: `Put /api/products no autorizado` });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    let productToUpdate = await products.getById(id);
    productToUpdate = { ...productToUpdate, ...body };
    await products.update(productToUpdate);
    res.json(productToUpdate);
  }
);

prodRouter.delete(
  '/:id',
  (req, res, next) => {
    if (isAdmin) {
      next();
    } else {
      res.json({
        error: -1,
        descripcion: `Delete /api/products no autorizado`,
      });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    await products.deleteById(id);
    res.json({ msg: `Producto ${id} eliminado` });
  }
);
