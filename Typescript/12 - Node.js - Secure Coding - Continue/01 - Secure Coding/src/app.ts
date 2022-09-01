import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import productsController from "./06-controllers/products-controller";
import authController from "./06-controllers/auth-controller";
import config from "./01-utils/config";
import path from "path";
import sanitize from "./02-middleware/sanitize";
import expressRateLimit from "express-rate-limit";
import https from "https";
import fs from "fs";

const server = express();

server.use(
  "/",
  expressRateLimit({
    windowMs: 1000, // Time window
    max: 10, // How many request we approve in the above time window
    message: "Are you a hacker?", // 429 Too Many Requests
  })
);

if (config.isDevelopment) {
  server.use(cors());
}
server.use(express.json());
server.use(expressFileUpload());
server.use(sanitize); // Prevent XSS attack

// Expose index.html from 07-frontend directory:
const frontendDir = path.join(__dirname, "07-frontend"); // Create full path to frontend directory.
server.use(express.static(frontendDir)); // Serve index.html when user request root url.

server.use("/api", productsController);
server.use("/api", authController);

// Route not found:
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  // On development - return 404 error
  if (config.isDevelopment) {
    next(new ErrorModel(404, "Route not found."));
  } else {
    // On production - return index.html to show desired page or page-not-found:
    const indexHtmlFile = path.join(__dirname, "07-frontend", "index.html");
    response.sendFile(indexHtmlFile);
  }
});

server.use(errorsHandler);

const sslServer = https.createServer(
  {
    key: fs.readFileSync(
      path.join(__dirname, "..", "cert", "17407761_northwind.com.key")
    ),
    cert: fs.readFileSync(
      path.join(__dirname, "..", "cert", "17407761_northwind.com.cert")
    ),
  },
  server
);

sslServer.listen(process.env.PORT, () => console.log("Listening..."));
