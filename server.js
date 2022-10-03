const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const prodsRouter = require('./routers/products');
const chatRouter = require('./routers/messages');
const notImplemented = require('./controllers/notImplemented');

//IMPLEMENTACION DE IO
const socketConnection = require('./utils/socket.io');
const httpServer = require('http').createServer(app);
socketConnection(httpServer);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
// ROUTERS
app.use('/api/products-test', prodsRouter);
app.use('/api/chat', chatRouter);
// ATRAPA RUTAS NO IMPLEMENTADAS
app.use(notImplemented);

// HBS CONFIG
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

//SERVER
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () =>
  console.log(`SERVER ON PORT http://localhost:${PORT}/`)
);

httpServer.on('error', (error) => {
  `Error en el servidor ${error}`;
});
