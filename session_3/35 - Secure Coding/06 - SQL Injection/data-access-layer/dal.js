const mysql = require("mysql");

const connection = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

// Support question mark values array:
function executeAsync(sql, values) {
  return new Promise((resolve, reject) => {
    // Send values array to query:
    connection.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  executeAsync,
};
