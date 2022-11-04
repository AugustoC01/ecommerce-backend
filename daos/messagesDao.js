const admin = require('firebase-admin');
const { config } = require('../config');
const { errorLogger } = require('../controllers/helperController');

class MessagesDao {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config),
    });
  }

  connect() {
    try {
      const db = admin.firestore();
      return db.collection('messages');
    } catch (e) {
      errorLogger(e.message);
    }
  }

  async save(msg) {
    const query = this.connect();
    try {
      await query.add(msg);
    } catch (e) {
      errorLogger(e.message);
    }
  }

  async getAll(sort) {
    const query = this.connect();
    try {
      let messages = [];
      if (sort) {
        messages = await query.orderBy('timestamp', 'desc').get();
      } else {
        messages = await query.get();
      }
      let messagesData = [];
      messages.forEach((msg) => {
        messagesData.push({ id: msg.id, ...msg.data() });
      });
      return messagesData;
    } catch (e) {
      errorLogger(e.message);
    }
  }
}

module.exports = MessagesDao;
