const express = require('express');
const app = express();
// -------EXPRESS MONGOSTORE, HBS-------
const { engine } = require('express-handlebars');
const MongoStore = require('connect-mongo');
// -------IMPORT ROUTERS-------
const notImplemented = require('./controllers/checkController');
const prodsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
//-------IMPORT DE SESSION Y PASSPORT-------
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
      mongoUrl:
        'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/?retryWrites=true&w=majority',
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
app.use(prodsRouter);
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
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () =>
  console.log(`SERVER ON PORT http://localhost:${PORT}/`)
);

httpServer.on('error', (error) => {
  `Error en el servidor ${error}`;
});
