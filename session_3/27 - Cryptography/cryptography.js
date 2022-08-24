const Cryptr = require("cryptr");

// Encryption key:
const encryptionKey = "MyBestSecretKeyEver!";

// Encrypt/Decrypt object:
const cryptr = new Cryptr(encryptionKey);

// Encrypt plain text:
function encrypt(plainText) {
  return cryptr.encrypt(plainText);
}

// Decrypt encrypted text:
function decrypt(encryptedText) {
  return cryptr.decrypt(encryptedText);
}

module.exports = {
  encrypt,
  decrypt,
};
