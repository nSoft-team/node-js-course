import express from "express";
import socketLogic from "./logic/socket-logic";

const expressServer = express();

const httpServer = expressServer.listen(3001, () =>
  console.log("Listening...")
);

// Start listening to sockets:
socketLogic(httpServer);
