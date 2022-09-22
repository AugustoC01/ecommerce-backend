const express = require('express');
const { ProductsDao } = require('../daos/mainDao');
const prodsRouter = express.Router();

const products = new ProductsDao();
const isAdmin = true;

prodsRouter.get('/', async (req, res) => {
  try {
    const productsData = await products.getAll();
    productsData.length !== 0
      ? res
          .status(200)
          .json({ status: 200, data: productsData, msg: 'Producto encontrado' })
      : res
          .status(404)
          .json({ status: 404, msg: 'No hay productos disponibles' });
  } catch (e) {
    console.log(e);
  }
});

prodsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await products.getById(id);
    productData
      ? res
          .status(200)
          .json({ status: 200, data: productData, msg: 'Producto encontrado' })
      : res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
  } catch (e) {
    console.log(e);
  }
});

prodsRouter.post(
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
    try {
      await products.save(body);
      res.status(200).json({ status: 200, data: body, msg: 'Producto creado' });
    } catch (e) {
      console.log(e);
    }
  }
);

prodsRouter.put(
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
    try {
      const update = await products.updateById(id, body);
      const updatedProd = await products.getById(id);
      update.upsertedCount === 1
        ? res.status(200).json({
            status: 200,
            data: updatedProd,
            msg: 'Producto actualizado',
          })
        : res.status(404).json({
            status: 404,
            msg: 'Producto no actualizado',
          });
    } catch (e) {
      console.log(e);
    }
  }
);

prodsRouter.delete(
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
    try {
      const deleted = await products.deleteById(id);
      deleted.deletedCount === 1
        ? res
            .status(200)
            .json({ status: 200, data: deleted, msg: `Producto eliminado` })
        : res.status(404).json({ status: 404, msg: `Producto no eliminado` });
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = prodsRouter;
