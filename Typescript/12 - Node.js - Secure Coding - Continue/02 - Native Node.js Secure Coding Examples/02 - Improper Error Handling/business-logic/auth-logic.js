const dal = require("../data-access-layer/dal");

async function registerAsync(user) {
  const sql = `INSERT INTO users VALUES(DEFAULT, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}')`;
  const info = await dal.executeAsync(sql);
  user.id = info.insertId;
  return user;
}

async function loginAsync(credentials) {
  const sql = `SELECT * FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
  const users = await dal.executeAsync(sql);
  if (users.length === 0) return null;
  const user = users[0];
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
