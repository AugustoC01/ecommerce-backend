const express = require('express');
const { Router } = express;
const { engine } = require('express-handlebars');

const app = express();
const router = Router();

//IMPLEMENTACION DE IO
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => console.log(`SERVER ON PORT ${PORT}`));

httpServer.on('error', (error) => {
  `Error en el servidor ${error}`;
});

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use('/api/products', router);

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// IMPORTACION DE LA CLASE CONTENEDOR
const Contenedor = require('./Contenedor.js');
const { optionsDB } = require('./options/mariaDB');
const { optionsSQ } = require('./options/SQLite3');
const products = new Contenedor('products', optionsDB);
const chatHistory = new Contenedor('chatHistory', optionsSQ);

// RUTA
app.get('/api/productos-test', (req, res) => {
  res.render('productsList');
});

//IMPLEMENTACION DEL SOCKET
io.on('connection', async (socket) => {
  const chatData = await chatHistory.getAll();
  const productsData = await products.getAll();
  io.sockets.emit('chatData', chatData);
  io.sockets.emit('productsData', productsData);

  // SI EL METODO DEVUELVE [], MUESTRO QUE NO SE ENCONTRO, SINO MUESTRO EL OBJETO
  const exampleProd = await products.getById(100);
  Object.keys(exampleProd).length == 0
    ? console.log('No se encontró información')
    : console.log(exampleProd);

  socket.on('chatMsg', async (msg) => {
    await chatHistory.save(msg);
    const chatData = await chatHistory.getAll();
    io.sockets.emit('chatData', chatData);
  });

  socket.on('addProd', async (data) => {
    await products.save(data);
    const productsData = await products.getAll();
    io.sockets.emit('productsData', productsData);
  });
});
