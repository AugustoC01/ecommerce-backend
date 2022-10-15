const { normalize, schema } = require('normalizr');

const mapChat = (chatData) => {
  let data = { id: 'messages', chats: [] };
  data.chats = chatData.map((msg) => {
    return {
      id: msg.id,
      author: msg.author,
      text: msg.text,
      timestamp: msg.timestamp,
    };
  });
  return data;
};

const normalizeMsg = (chatMsg) => {
  // console.log('-------------------- ORIGINAL DATA -------------------');
  // console.log(chatMsg);
  const formatedData = mapChat(chatMsg);
  // console.log('-------------------- FORMATED DATA -------------------');
  // console.log(formatedData);

  const authorSchema = new schema.Entity('authors');
  const messageSchema = new schema.Entity('messages', { author: authorSchema });
  const chatSchema = new schema.Entity('chats', { chats: [messageSchema] });

  const normalizedData = normalize(formatedData, chatSchema);
  // console.log('-------------------- NORMALIZED DATA -------------------');
  // console.log(normalizedData);
  return normalizedData;
};

module.exports = normalizeMsg;
