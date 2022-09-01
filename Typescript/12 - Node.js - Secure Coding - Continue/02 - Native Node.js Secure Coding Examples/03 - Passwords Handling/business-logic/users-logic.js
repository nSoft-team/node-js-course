const dal = require("../data-access-layer/dal");

async function getOneUserAsync(id) {
  // Select all fields without the password, so it won't returned to client in the response:
  const sql = `SELECT id, firstName, lastName, username FROM users WHERE id = ${id}`;

  const users = await dal.executeAsync(sql);
  return users[0];
}

async function updateUserAsync(user) {
  const sql = `UPDATE users SET firstName = '${user.firstName}', lastName = '${user.lastName}', username = '${user.username}' WHERE id = ${user.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : user;
}

module.exports = {
  getOneUserAsync,
  updateUserAsync,
};
