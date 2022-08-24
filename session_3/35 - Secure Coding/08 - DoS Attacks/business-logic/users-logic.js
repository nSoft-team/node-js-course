const dal = require("../data-access-layer/dal");

async function getOneUserAsync(uuid) {
  const sql =
    "SELECT uuid, firstName, lastName, username FROM users WHERE uuid = ?";
  const users = await dal.executeAsync(sql, [uuid]);
  return users[0];
}

async function updateUserAsync(user) {
  const sql =
    "UPDATE users SET firstName = ?, lastName = ?, username = ? WHERE uuid = ?";
  const info = await dal.executeAsync(sql, [
    user.firstName,
    user.lastName,
    user.username,
    user.uuid,
  ]);
  return info.affectedRows === 0 ? null : user;
}

module.exports = {
  getOneUserAsync,
  updateUserAsync,
};
