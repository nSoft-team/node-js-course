// process.env.NODE_ENV should contain the string "production" if the app is running in production, or "development" if the app is running in development:
global.config =
  process.env.NODE_ENV === "production"
    ? require("./config.json").production
    : require("./config.json").development;

// If not (like in Azure), we can use process.env.PORT to see if we're in production or development:
// global.config = process.env.PORT ? require("./config.json").production : require("./config.json").development;

console.log("Log Folder:", config.logFolder);
console.log("Database Name: ", config.mysql.database);
console.log("Database Password: ", config.mysql.password);
