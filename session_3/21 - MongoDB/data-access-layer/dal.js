const mongodb = require("mongodb");

let database;

(async () => {
  try {
    const options = {
      useNewUrlParser: true, // Use the new URL parser (old one is deprecated).
      useUnifiedTopology: true, // Use the new topology engine for handling the different parts of MongoDB (topology = the way in which the inner parts are interrelated or arranged).
    };
    const mongoClient = await mongodb.MongoClient.connect(
      config.mongodb.connectionString,
      options
    );
    database = mongoClient.db();
    console.log(`We're connected to ${database.namespace} on MongoDB`);
  } catch (err) {
    console.error(err);
  }
})();

function getDatabase() {
  return database;
}

module.exports = {
  getDatabase,
};
