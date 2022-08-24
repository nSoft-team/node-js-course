const crypto = require("crypto");
const jwt = require("jsonwebtoken"); // npm i jsonwebtoken

const salt = "MakeThingsGoRight";

function hash(plainText) {
  if (!plainText) return null;
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

// Get a new JWT token:
function getNewToken(user) {
  const payload = { user };
  return jwt.sign(payload, config.jwtKey, { expiresIn: "30m" });
}

// Verify token (401 = illegal or expired token, 403 = legal token but forbidden action):
function verifyTokenAsync(authorizationHeader) {
  return new Promise((resolve) => {
    if (!authorizationHeader) return resolve(false);
    const token = authorizationHeader.split(" ")[1]; // authorization: "Bearer the-token"
    if (!token) return resolve(false);
    jwt.verify(token, config.jwtKey, (err, payload) => resolve(!err)); // payload.user is the user object we embed inside the token.
  });
}

module.exports = {
  hash,
  getNewToken,
  verifyTokenAsync,
};
