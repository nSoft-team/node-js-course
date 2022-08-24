// Accessing the database.

const mysql = require("mysql");

// Creating a connection to Northwind database:
const connection = mysql.createPool({
  // createConnection creates only one connection which on realtime server could disconnect if not in use. createPool creates a pool of connections which don't suppose to be closed on realtime server.
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

// Execute sql:
function executeAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  executeAsync,
};
