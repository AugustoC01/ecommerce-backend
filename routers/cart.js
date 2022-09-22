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
