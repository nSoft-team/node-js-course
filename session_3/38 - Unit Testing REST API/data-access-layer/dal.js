const mongoose = require("mongoose");

(async () => {
  try {
    // Only for test environment - mock the database so the tests won't depend on a real database, but only on the test itself (e.g. if there are unique index that could failed a test etc.).
    if (process.env.NODE_ENV === "test") {
      const { Mockgoose } = require("mockgoose"); // npm i --save-dev mockgoose
      const mockgoose = new Mockgoose(mongoose);
      await mockgoose.prepareStorage(); // Note: on first run per machine, this takes time cause it downloads a new MongoDB database. Thus only on first run - remove --exit flag from package.json to enable the download to complete.
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    const db = await mongoose.connect(config.mongodb.connectionString, options);
    console.log(`We're connected to ${db.connections[0].name} on MongoDB`);
  } catch (err) {
    console.error(err.message);
  }
})();
