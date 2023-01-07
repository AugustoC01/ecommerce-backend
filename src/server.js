const express = require('express');
const app = express();
app.enable('trust proxy');

const { dbConnect } = require('./daos/mongoConn');
dbConnect();

const cors = require('cors');
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);

// -------IMPORT SESSION, HBS Y ROUTER-------
const sessionMiddleware = require('./middlewares/session');
const viewEngine = require('./middlewares/viewEngine');
const Router = require('./routes/router');
sessionMiddleware(app);
viewEngine(app, express);
Router(app);

//INICIA SERVER EN MODO FORK SI ENV.MODE=development O CLUSTER EN production
const httpServer = require('http').createServer(app);
const clusterHandle = require('./helpers/cluster');
clusterHandle(httpServer);

/*
//IMPLEMENTACION DEL SOCKET
io.on('connection', async (socket) => {
  
  //SE PODRIA HACER QUE EL JOIN SEA A UNA SALA DE NOMBRE IGUAL A EMAIL DE USER
  socket.join(req.user.name)

  //LOGICA CUANDO EL SERVER RECIBE UN MENSAJE
  socket.on('chatMsg', async (msg) => {
    // const container = await getContainer(msg.mail);
    await container.save(msg);
    const chatData = await chatHistory.getAll();
    //ESTA ORDEN ENVIA A TODOS LOS MENSAJES, NECESITO ENVIAR A UNO SOLO
    io.sockets.emit('chatData', chatData);
  });
});


//LOGICA PARA BUSCAR DONDE GUARDAR LOS MENSAJES
async function getContainer(name) {
  const chats = await chatsList.getAll();
  if (!chats) {
    await chatsList.save(name);
    return name;
  }
  const myChat = chats.find((chat) => chat == name);
  if (!myChat) {
    await chatsList.save(name);
    return name;
  }
  return myChat;
}

//LOGICA PARA GUARDARLOS
async function saveMsg(container, data) {
} 
*/
