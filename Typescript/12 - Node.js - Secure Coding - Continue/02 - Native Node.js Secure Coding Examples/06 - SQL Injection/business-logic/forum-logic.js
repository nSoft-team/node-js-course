const dal = require("../data-access-layer/dal");

async function getAllMessagesAsync() {
  const sql = "SELECT * FROM forum";
  const messages = await dal.executeAsync(sql);
  return messages;
}

async function addMessageAsync(message) {
  // Execute query using question mark values:
  const sql = "INSERT INTO forum VALUES(DEFAULT, ?, ?)";
  const info = await dal.executeAsync(sql, [message.sender, message.text]);

  message.id = info.insertId;
  return message;
}

module.exports = {
  getAllMessagesAsync,
  addMessageAsync,
};
