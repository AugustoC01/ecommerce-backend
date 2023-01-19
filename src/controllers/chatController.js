const { userData, userHistory } = require("../services/chatService");

const chat = (req, res) => {
  const user = userData(req.user);
  res.status(200).render("mainChat", { user });
};

const getHistory = async (req, res) => {
  const { email } = req.params;
  let chat = true;
  const history = await userHistory(email);
  if (history.length == 0) chat = false;
  res.status(200).render("mainHistory", { history: history, chat });
};

module.exports = { chat, getHistory };
