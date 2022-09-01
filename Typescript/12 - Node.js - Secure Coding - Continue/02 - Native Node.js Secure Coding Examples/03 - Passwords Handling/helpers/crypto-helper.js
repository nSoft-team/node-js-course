const crypto = require("crypto");

// SHA: Secure Hashing Algorithm
// MD5: Message Digest Algorithm 5
// HMAC: Hash based Message Authentication Code
// Rainbow Tables: a lookup tables containing pre-calculated hash passwords.
// Salt: Adding a fixed or random string to the original password before hashing it.
// Note: if the salt is random, it must be also saved at database for validating the password at login.

// Salting text:
const salt = "MakeThingsGoRight";

function hash(plainText) {
  if (!plainText) return null;

  // Hashing without salt:
  return crypto.createHash("sha512").update(plainText).digest("hex");

  // // Hashing with salt:
  // return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
  hash,
};
