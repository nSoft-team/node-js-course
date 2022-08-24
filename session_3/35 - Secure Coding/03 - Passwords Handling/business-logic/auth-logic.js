const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper"); // Hash passwords.

async function registerAsync(user) {
  // Hash password:
  user.password = cryptoHelper.hash(user.password);

  const sql = `INSERT INTO users VALUES(DEFAULT, '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}')`;
  const info = await dal.executeAsync(sql);
  user.id = info.insertId;

  // Delete password so it won't returned to client in the response:
  delete user.password;

  return user;
}

async function loginAsync(credentials) {
  // Hash password:
  credentials.password = cryptoHelper.hash(credentials.password);

  // Get all columns without password:
  const sql = `SELECT id, firstName, lastName, username FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

  const users = await dal.executeAsync(sql);
  if (users.length === 0) return null;
  const user = users[0];
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
