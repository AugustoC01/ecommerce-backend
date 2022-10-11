const { MessagesDao } = require('../daos/mainDao');
const normalizeMsg = require('./socket.io.controller');

const Messages = new MessagesDao();

const socketConnection = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', async (socket) => {
    const chatData = await Messages.getAll({ sort: true });
    const normalizedChat = normalizeMsg(chatData);
    socket.emit('chatData', normalizedChat);

    socket.on('chatMsg', async (newMsg) => {
      await Messages.save(newMsg);
      const chatData = await Messages.getAll({ sort: true });
      const normalizedChat = normalizeMsg(chatData);
      io.sockets.emit('chatData', normalizedChat);
    });
  });
};

module.exports = socketConnection;
