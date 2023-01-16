const { Factory } = require("../daos/mainDao");
const DaoFactory = new Factory();
const Messages = DaoFactory.createDao("Messages");

const userData = (user) => {
  return {
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

const getMessages = async (email) => {
  const messages = await Messages.getAll(email);
  return messages.map((msg) => {
    return {
      email: msg.email,
      type: msg.type,
      timestamp: msg.timestamp,
      message: msg.msg,
    };
  });
};

const userHistory = async (email) => {
  const messages = await Messages.getAll(email);
  return messages.map((msg) => {
    return {
      email: msg.type == "usuario" ? msg.email : "Admin",
      admin: msg.type == "usuario" ? false : true,
      timestamp: new Date(msg.timestamp).toLocaleString(),
      message: msg.msg,
    };
  });
};

const saveMsg = async (msg) => {
  return await Messages.save(msg);
};

const getUsers = (users, adminEmail) => {
  if (adminEmail) {
    return Object.keys(users).filter((user) => user !== adminEmail);
  }
  return Object.keys(users);
};

module.exports = { userData, getMessages, saveMsg, getUsers, userHistory };
