const express = require('express');
const app = express();

app.enable('trust proxy');

// -------HBS, DOTENV-------
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');
require('dotenv').config();
// -------IMPORT ROUTERS-------
const prodsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const infoRouter = require('./routes/info');
const randomRouter = require('./routes/random');
const notImplemented = require('./controllers/checkController');
//-------IMPORT DE SESSION Y PASSPORT-------
const session = require('./helpers/session/session');
const usersDb = require('./daos/mainDao');
const passport = require('./helpers/passport/passport');
// -------IMPLEMENTACION DE IO-------
const socketConnection = require('./helpers/socket/socket.io');
const httpServer = require('http').createServer(app);
socketConnection(httpServer);
// -------CONEXION A DB-------
usersDb;
// -------MIDDLEWARES-------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(session);
// -------PASSPORT-------
app.use(passport.initialize());
app.use(passport.session());
// -------ROUTERS-------
app.use(authRouter);
app.use(infoRouter);
app.use(prodsRouter);
app.use(randomRouter);
app.use(notImplemented);
// -------HBS CONFIG-------
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

//-------SERVER Y CLUSTER-------
const clusterServer = require('./helpers/cluster/cluster');
clusterServer(httpServer);

httpServer.on('error', (error) => {
  `Error en el servidor ${error}`;
});
