const { getMessages, saveMsg, getUsers } = require("../services/chatService");

const privateChatHandle = (http) => {
  const io = require("socket.io")(http);
  const users = [];
  let adminEmail;

  io.on("connection", (socket) => {
    console.log("User ", socket.id);

    socket.on("user-connected", ({ email, admin }) => {
      users[email] = socket.id;
      let usersData;
      if (admin == "true") {
        adminEmail = email;
        usersData = getUsers(users, email);
      } else {
        usersData = getUsers(users);
      }
      io.emit("show-user", usersData);
    });

    socket.on("retrieve-chats", async ({ email, adminEmail }) => {
      const messages = await getMessages(email);
      io.to(users[adminEmail]).emit("chat-data", messages);
    });

    socket.on("send-msg", async ({ sender, receiver, message, admin }) => {
      let msgData = { msg: message };
      if (admin == "true") {
        msgData.email = receiver;
        msgData.type = "sistema";
      } else {
        msgData.email = sender;
        msgData.type = "usuario";
      }
      const socketId = admin == "true" ? users[receiver] : users[adminEmail];
      await saveMsg(msgData);
      io.to(socketId).emit("new-msg", msgData);
    });
  });
};

module.exports = privateChatHandle;
