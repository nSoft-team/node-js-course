const dal = require("../data-access-layer/dal");

async function getOneUserAsync(uuid) {
  // Execute query using question mark values:
  const sql =
    "SELECT uuid, firstName, lastName, username FROM users WHERE uuid = ?";
  const users = await dal.executeAsync(sql, [uuid]);

  return users[0];
}

async function updateUserAsync(user) {
  // Execute query using question mark values:
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
