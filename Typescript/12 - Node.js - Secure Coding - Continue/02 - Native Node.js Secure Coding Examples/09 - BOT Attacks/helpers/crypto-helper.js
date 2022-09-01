const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const salt = "MakeThingsGoRight";

function hash(plainText) {
  if (!plainText) return null;
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

function getNewToken(user) {
  const payload = { user };
  return jwt.sign(payload, config.jwtKey, { expiresIn: "30m" });
}

function verifyTokenAsync(authorizationHeader) {
  return new Promise((resolve) => {
    if (!authorizationHeader) return resolve(false);
    const token = authorizationHeader.split(" ")[1];
    if (!token) return resolve(false);
    jwt.verify(token, config.jwtKey, (err, payload) => resolve(!err));
  });
}

module.exports = {
  hash,
  getNewToken,
  verifyTokenAsync,
};
