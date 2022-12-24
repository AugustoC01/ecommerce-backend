const { engine } = require('express-handlebars');
const compression = require('compression');
const path = require('path');

const viewEngine = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use(compression());

  app.set('view engine', 'hbs');
  // app.set('views', './views');
  app.set('views', path.join(__dirname, '../../views'));
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: path.join(__dirname, '../../views/layouts'),
      partialsDir: path.join(__dirname, '../../views/partials'),
    })
  );
};

module.exports = viewEngine;
