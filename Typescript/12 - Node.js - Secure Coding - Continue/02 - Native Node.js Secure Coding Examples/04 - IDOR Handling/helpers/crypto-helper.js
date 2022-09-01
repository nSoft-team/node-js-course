const crypto = require("crypto");

const salt = "MakeThingsGoRight";

function hash(plainText) {
  if (!plainText) return null;
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
  hash,
};
