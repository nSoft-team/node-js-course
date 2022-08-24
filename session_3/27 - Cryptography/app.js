const cryptography = require("./cryptography");

const plainText = "Hello, this is my text...";
const encryptedText = cryptography.encrypt(plainText);
const decryptedText = cryptography.decrypt(encryptedText);

console.log(plainText);
console.log(encryptedText);
console.log(decryptedText);
