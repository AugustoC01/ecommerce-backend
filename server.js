const express = require('express');
const prodsRouter = require('./routers/products');
const cartsRouter = require('./routers/cart');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use('/api/products', prodsRouter);
app.use('/api/cart', cartsRouter);

// ATRAPA RUTAS NO IMPLEMENTADAS
app.use((req, res) => {
  res.status(404);
  res.json({ error: -2, description: `Ruta ${req.path} no implementada` });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}/`);
});
server.on('error', (error) => {
  console.log(`Server error ${error}`);
});
