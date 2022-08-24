const mongoose = require("mongoose");

(async () => {
  try {
    const options = {
      useNewUrlParser: true, // Use the new URL parser (old one is deprecated).
      useUnifiedTopology: true, // Use the new topology engine for handling the different parts of MongoDB (topology = the way in which the inner parts are interrelated or arranged).
      useCreateIndex: true, // Needed for creating the unique index.
      useFindAndModify: false, // Needed for findByIdAndUpdate.
    };
    const db = await mongoose.connect(config.mongodb.connectionString, options);
    console.log(`We're connected to ${db.connections[0].name} on MongoDB`);
  } catch (err) {
    console.error(err);
  }
})();
