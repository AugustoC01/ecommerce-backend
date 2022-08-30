const express = require('express');
const { Router } = express;

const app = express();
const prodRouter = Router();
const cartRouter = Router();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

server.on('error', (error) => {
  `Error en el servidor ${error}`;
});

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.use('/api/products', prodRouter);
app.use('/api/cart', cartRouter);

//ATRAPA RUTAS NO IMPLEMENTADAS
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: -2, descripcion: `Ruta ${req.path} no implementada` });
});

// IMPORTACION DE LA CLASE CONTENEDOR
const Contenedor = require('./ManejoArchivos.js');
const products = new Contenedor('productos');
const carts = new Contenedor('cart');

const isAdmin = true;

// IMPLEMENTACION DEL ROUTER DE PRODUCTOS
prodRouter.get('/', async (req, res) => {
  const productsData = await products.getAll();
  productsData.length === 0
    ? res.json({ msg: 'No hay productos disponibles' })
    : res.json(productsData);
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

// IMPLEMENTACION DEL ROUTER DE CARRITO
cartRouter.post('/', async (req, res) => {
  const cart = {};
  cart.id = await carts.getNewId();
  cart.timestamp = new Date().toLocaleString();
  cart.products = [];
  await carts.save(cart);
  res.json({ cartId: cart.id });
});

cartRouter.post('/:id/products', async (req, res) => {
  const { id } = req.params;
  const { prodId } = req.body;
  let cart = await carts.getById(id);
  const prod = await products.getById(prodId);
  cart.products.push(prod);
  await carts.update(cart);
  res.json({ msg: 'Producto agregado', cart: cart });
});

cartRouter.get('/:id/products', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await carts.getById(id);
    if (cart) {
      res.json(cart.products);
    }
  } catch (error) {
    if (TypeError) {
      res.json({ msg: 'Carrito no encontrado' });
    } else {
      console.log(error);
    }
  }
});

cartRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await carts.deleteById(id);
  res.json({ msg: `Carrito eliminado` });
});

cartRouter.delete('/:id/products/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params;
  const cart = await carts.getById(id);
  const prods = [];
  cart.products.forEach((prod) => {
    if (prod.id != id_prod) {
      prods.push(prod);
    }
  });
  cart.products = prods;
  await carts.update(cart);
  res.json({ msg: `Producto eliminado` });
});
