const express = require('express');
const routerProducts = require('./routers/products');
const routerCart = require('./routers/cart');

const app = express();

// MIDDLEWARES
app.use(express.join());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);

server.on('error', (error) => {
  console.log(`Server error ${error}`);
});

// ATRAPA RUTAS NO IMPLEMENTADAS
app.use((req, res) => {
  res.status(404);
  res.json({ error: -2, description: `Ruta ${req.path} no implementada` });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server on https://localhost:${PORT}/`);
});
