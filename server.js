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
const Contenedor = require('./ManejoArchivos.js');
const products = new Contenedor('products');
const chatHistory = new Contenedor('chatHistory');

// RUTA
app.get('/', async (req, res) => {
  res.render('productsList');
});

//IMPLEMENTACION DEL SOCKET
io.on('connection', async (socket) => {
  const chatData = await chatHistory.getAll();
  const productsData = await products.getAll();
  io.sockets.emit('chatData', chatData);
  io.sockets.emit('productsData', productsData);

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

/* router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await products.getById(id);
    if (productData) {
      res.render('productView', { product: productData });
    }
  } catch (error) {
    if (TypeError) {
      res.render('productNotFound', { errorMsg: 'Producto no encontrado' });
    } else {
      console.log(error);
    }
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newId = await products.getNewId();
  body.id = newId;
  body.price = parseFloat(body.price);
  await products.save(body);
  console.log(body);
  res.redirect('/form');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let productToUpdate = await products.getById(id);
  productToUpdate = { ...productToUpdate, ...body };
  await products.update(productToUpdate);
  res.redirect('/api/products');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await products.deleteById(id);
  res.redirect('/api/products');
});

// RUTA DEL FORMULARIO DE CARGA
app.get('/form', (req, res) => {
  res.render('productForm');
});
*/
