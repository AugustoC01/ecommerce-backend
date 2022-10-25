const express = require('express');
const app = express();
// -------EXPRESS MONGOSTORE, HBS, YARGS, DOTENV-------
const { engine } = require('express-handlebars');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
require('dotenv').config();
const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.default({ port: 8080 }).argv;
// -------IMPORT ROUTERS-------
const notImplemented = require('./controllers/checkController');
const prodsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const infoRouter = require('./routes/info');
const randomRouter = require('./routes/random');
//-------IMPORT DE SESSION Y PASSPORT-------
const { MONGO_URL } = require('./config');
const session = require('express-session');
const usersDb = require('./daos/mainDao');
const passport = require('./passport/passport');
// -------IMPLEMENTACION DE IO-------
const socketConnection = require('./utils/socket/socket.io');
const httpServer = require('http').createServer(app);
socketConnection(httpServer);
// -------CONEXION A DB-------
usersDb;
// -------MIDDLEWARES-------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: 'A secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
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

//-------SERVER-------
const PORT = args.port;

httpServer.listen(PORT, () =>
  console.log(`SERVER ON PORT http://localhost:${PORT}/`)
);

httpServer.on('error', (error) => {
  `Error en el servidor ${error}`;
});
