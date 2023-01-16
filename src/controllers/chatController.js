const { userData, userHistory } = require("../services/chatService");

const chat = (req, res) => {
  const user = userData(req.user);
  res.status(200).render("mainPrivateChat", { user });
};

const getHistory = async (req, res) => {
  const { email } = req.params;
  const history = await userHistory(email);
  res.status(200).render("mainHistory", { history: history });
};

module.exports = { chat, getHistory };
