const socket = io();

// FUNCION DENORMALIZR
const denormalizeMsg = (data) => {
  const authorSchema = new normalizr.schema.Entity('authors');
  const messageSchema = new normalizr.schema.Entity('messages', {
    author: authorSchema,
  });
  const chatSchema = new normalizr.schema.Entity('chats', {
    chats: [messageSchema],
  });

  const denormalizeData = normalizr.denormalize(
    data.result,
    chatSchema,
    data.entities
  );
  return denormalizeData;
};

socket.on('chatData', (data) => {
  const denormalizedChat = denormalizeMsg(data);
  const chatData = denormalizedChat.chats.reduce(function (chatMsgs, newMsg) {
    const timestamp = new Date(newMsg.timestamp).toLocaleString();
    const chat =
      chatMsgs +
      `
    <tr>
    <td> <p class='user'>${newMsg.author.id}</p> </td>
    <td> <p class='date'>[${timestamp}] :</p> </td>
    <td> <p class='msg'>${newMsg.text}<p/> </td>
    <td> <img class='avatar' src="${newMsg.author.avatar}" alt="avatar"> </td>
    </tr>`;
    return chat;
  }, '');
  const compression =
    (JSON.stringify(data).length * 100) /
    JSON.stringify(denormalizedChat).length;

  document.getElementById(
    'chat-compression'
  ).innerHTML = `(Compresión: ${compression.toFixed(2)}%)`;

  document.getElementById('msg-list').innerHTML = chatData;
});

function sendMsg(chatData) {
  let messageToAdd = {
    author: {
      id: chatData.mail.value,
      name: chatData.name.value,
      surmame: chatData.surname.value,
      age: chatData.age.value,
      alias: chatData.alias.value,
      avatar: chatData.avatar.value,
    },
    timestamp: new Date(),
    text: chatData.msg.value,
  };

  socket.emit('chatMsg', messageToAdd);
}
