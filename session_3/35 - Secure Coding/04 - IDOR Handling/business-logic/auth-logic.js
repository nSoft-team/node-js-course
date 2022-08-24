const uuid = require("uuid"); // npm i uuid
const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {
  user.password = cryptoHelper.hash(user.password);

  // Create user's UUID:
  user.uuid = uuid.v4();

  // Insert user's UUID to it's column:
  const sql = `INSERT INTO users VALUES(DEFAULT, '${user.uuid}', '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}')`;

  // No need to get back the created id:
  await dal.executeAsync(sql);

  delete user.password;
  return user;
}

async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);

  // Get back uuid instead of id:
  const sql = `SELECT uuid, firstName, lastName, username FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

  const users = await dal.executeAsync(sql);
  if (users.length === 0) return null;
  const user = users[0];
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
