const prodsRouter = require('./products');
const authRouter = require('./auth');
const infoRouter = require('./info');
const cartRouter = require('./cart');
const { infoLogger, notImplemented } = require('../helpers/logger');

const Router = (app) => {
  // infoLogger;

  app.get('/', (req, res) => {
    res.status(200).redirect('/login');
  });

  app.use(authRouter);
  app.use(checkAuth);

  app.use(infoRouter);
  app.use('/productos', prodsRouter);
  app.use('/carrito', cartRouter);

  app.use(notImplemented);
};

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).redirect('/login');
};

module.exports = Router;
