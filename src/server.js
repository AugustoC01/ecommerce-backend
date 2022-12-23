const express = require('express');
const app = express();
app.enable('trust proxy');

// const { MONGO_URL, FIREBASE_AUTH } = require('./config');
// if (MONGO_URL) {
const { dbConnect } = require('./daos/mongoConn');
dbConnect();
// } else {

// }

// -------IMPORT SESSION, HBS Y ROUTER-------
const sessionMiddleware = require('./middlewares/session');
const viewEngine = require('./middlewares/viewEngine');
const Router = require('./routes/router');
sessionMiddleware(app);
viewEngine(app, express);
Router(app);

//INICIA SERVER EN MODO FORK O CLUSTER
const httpServer = require('http').createServer(app);
const clusterHandle = require('./helpers/cluster');
clusterHandle(httpServer);
