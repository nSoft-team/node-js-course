const dal = require("../data-access-layer/dal");

// Get user by its uuid and not by its id:
async function getOneUserAsync(uuid) {
  const sql = `SELECT uuid, firstName, lastName, username FROM users WHERE uuid = '${uuid}'`;
  const users = await dal.executeAsync(sql);
  return users[0];
}

// Update user by its uuid and not by its id:
async function updateUserAsync(user) {
  const sql = `UPDATE users SET firstName = '${user.firstName}', lastName = '${user.lastName}', username = '${user.username}' WHERE uuid = '${user.uuid}'`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : user;
}

module.exports = {
  getOneUserAsync,
  updateUserAsync,
};
