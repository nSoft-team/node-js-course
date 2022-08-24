const express = require("express");
const io = require("socket.io"); // npm i socket.io
const server = express();

// Listen using express but get back a listener object:
const port = process.env.PORT || 3001;
const listener = server.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`)
);

// Create sockets manager object:
const socketsManager = io(listener, {
  cors: { origin: "http://127.0.0.1:5500" },
}); // 127.0.0.1:5500 = Live Server (or * for all clients).

// Listen to connection event from any client:
socketsManager.sockets.on("connection", (socket) => {
  console.log(
    "One client has been connected. Total clients: " +
      socketsManager.engine.clientsCount
  );

  // Listen to client message:
  socket.on("msg-from-client", (msg) => {
    console.log("Client sent message: ", msg);
  });

  // Each random ms:
  const timerId = setInterval(() => {
    // Send some message to the connected client:
    socket.emit("msg-from-server", "I'm your beloved server :-)");
  }, 5000);

  // Listen to disconnect event from the connected client:
  socket.on("disconnect", () => {
    clearInterval(timerId);
    console.log(
      "One client has been disconnected. Total clients: " +
        (socketsManager.engine.clientsCount - 1)
    ); // We're about to disconnect.
  });
});
