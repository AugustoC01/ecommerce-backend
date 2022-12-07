const express = require('express');
const app = express();
app.enable('trust proxy');

const { dbConn } = require('./src/daos/mongoConn');
dbConn();
// -------IMPORT SESSION, HBS Y ROUTER-------
const sessionMiddleware = require('./src/middlewares/session');
const viewEngine = require('./src/middlewares/viewEngine');
const Router = require('./src/routes/router');
sessionMiddleware(app);
viewEngine(app, express);
Router(app);

//INICIA SERVER EN MODO FORK O CLUSTER
const httpServer = require('http').createServer(app);
const clusterHandle = require('./src/helpers/cluster');
clusterHandle(httpServer);
