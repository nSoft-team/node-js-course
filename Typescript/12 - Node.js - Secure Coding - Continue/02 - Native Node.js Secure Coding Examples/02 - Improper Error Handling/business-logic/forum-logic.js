const dal = require("../data-access-layer/dal");

async function getAllMessagesAsync() {
  const sql = "SELECT * FROM forum";
  const messages = await dal.executeAsync(sql);
  return messages;
}

async function addMessageAsync(message) {
  const sql = `INSERT INTO forum VALUES(DEFAULT, '${message.sender}', '${message.text}')`;
  const info = await dal.executeAsync(sql);
  message.id = info.insertId;
  return message;
}

module.exports = {
  getAllMessagesAsync,
  addMessageAsync,
};
