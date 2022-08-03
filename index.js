const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// IMPORTACION DE LA CLASE CONTENEDOR
const Contenedor = require('./ManejoArchivos.js');
const products = new Contenedor('productos');

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});

server.on('error', (error) => {
  `Error en el servidor ${error}`;
});

app.get('/', (req, res) => {
  res.send({ mensaje: 'Hola mundo' });
});

app.get('/productos', async (req, res) => {
  const productsData = await products.getAll();
  res.send(productsData);
});

app.get('/productoRandom', async (req, res) => {
  let randomId = Math.floor(Math.random() * 10) + 1;
  const randomProduct = await products.getById(randomId);
  res.send(randomProduct);
});
