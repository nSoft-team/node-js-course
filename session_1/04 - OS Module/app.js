// The os Module gives information about the current Operating System.

const os = require("os");

console.log("OS Type: " + os.type);
console.log("Username: " + os.userInfo().username);
console.log("Host Name: " + os.hostname());
console.log("Home Directory: " + os.userInfo().homedir);
console.log("Total Memory", os.totalmem());
console.log("Free Memory", os.freemem());
