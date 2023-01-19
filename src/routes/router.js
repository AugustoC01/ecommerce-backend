const prodsRouter = require("./products");
const authRouter = require("./auth");
const infoRouter = require("./info");
const cartRouter = require("./cart");
const chatRouter = require("./chat");
const { infoLogger, notImplemented } = require("../helpers/logger");
const { checkAuth } = require("../helpers/routes");

const Router = (app) => {
  infoLogger;

  app.get("/", (req, res) => {
    res.status(200).redirect("/productos");
  });

  app.use(authRouter);
  app.use(checkAuth);

  app.use(infoRouter);
  app.use("/chat", chatRouter);
  app.use("/productos", prodsRouter);
  app.use("/carrito", cartRouter);

  app.use(notImplemented);
};

module.exports = Router;
