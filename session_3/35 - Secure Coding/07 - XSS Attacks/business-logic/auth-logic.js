const uuid = require("uuid");
const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {
  user.password = cryptoHelper.hash(user.password);
  user.uuid = uuid.v4();
  const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)";
  await dal.executeAsync(sql, [
    user.uuid,
    user.firstName,
    user.lastName,
    user.username,
    user.password,
  ]);
  delete user.password;
  user.token = cryptoHelper.getNewToken(user);
  return user;
}

async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);
  const sql =
    "SELECT uuid, firstName, lastName, username FROM users WHERE username = ? AND password = ?";
  const users = await dal.executeAsync(sql, [
    credentials.username,
    credentials.password,
  ]);
  if (users.length === 0) return null;
  const user = users[0];
  user.token = cryptoHelper.getNewToken(user);
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
