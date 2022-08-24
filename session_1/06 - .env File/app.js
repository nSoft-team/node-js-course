const dotenv = require("dotenv"); // npm i dotenv

// Load .env file into process.env object
dotenv.config();

// Read the loaded variables:
console.log(process.env.MACHINE_USERNAME);
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
