const { Factory } = require('../../daos/mainDao');
const DaoFactory = new Factory();
const Messages = DaoFactory.createDao('Messages');

const privateChatHandle = (http) => {
  const io = require('socket.io')(http);
  const users = [];

  io.on('connection', (socket) => {
    console.log('User ', socket.id);

    // cuando un usuario se conecta
    socket.on('user-connected', async (username) => {
      //guarda el usuario en un array de usuarios
      users[username] = socket.id;
      const messages = await Messages.getAll(username);
      //avisa a todos que se conecto alguien
      io.emit('user-connected', { username, messages });
    });

    socket.on('send-msg', async (data) => {
      // console.log(data);
      //ENVIAR EL MENSAJE A DESTINO
      const socketId = users[data.receiver];
      await Messages.save({
        email: data.receiver,
        type: 'usuario',
        msg: data.message,
      });
      io.to(socketId).emit('new-msg', data);
    });
  });
};

module.exports = privateChatHandle;
