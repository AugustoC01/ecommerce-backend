const { errorLogger } = require("../helpers/logger");
const Messages = require("../models/messageSchema");

let instance = null;
class MessagesDao {
  static getInstance() {
    if (!instance) instance = new MessagesDao();
    return instance;
  }

  async save(msg) {
    try {
      msg.timestamp = new Date().toLocaleString();
      await Messages.create(msg);
    } catch (e) {
      errorLogger(e);
    }
  }

  async getAll(email) {
    try {
      return await Messages.find({ email }).sort("-timestamp");
    } catch (e) {
      errorLogger(e);
    }
  }
}

module.exports = MessagesDao;
