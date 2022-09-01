import mysql from "mysql";

// Create a pool of connections for connecting to MySQL database:
const connection = mysql.createPool({
  host: "localhost", // Computer name where the database exists.
  user: "root", // Database username
  password: "", // Database password
  database: "Northwind", // Database name
});

// sql: "SELECT * FROM Products"
function execute(sql: string): Promise<any> {
  // Promisify sql access:
  return new Promise<any>((resolve, reject) => {
    // Execute SQL query:
    connection.query(sql, (err, result) => {
      // On error - report the error:
      if (err) {
        reject(err);
        return;
      }

      // On success - report the return data:
      resolve(result);
    });
  });
}

export default {
  execute,
};
