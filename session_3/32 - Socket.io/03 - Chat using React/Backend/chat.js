const io = require("socket.io"); // npm i socket.io

function init(listener) {
  const socketsManager = io(listener, {
    cors: { origin: "http://localhost:3000" },
  }); // React

  socketsManager.sockets.on("connection", (socket) => {
    console.log(
      "Client Connected. Total clients: ",
      socketsManager.engine.clientsCount
    );

    socket.on("msg-from-client", (msg) => {
      console.log("Client Message: ", msg);
      socketsManager.sockets.emit("msg-from-server", msg);
    });

    socket.on("disconnect", () => {
      console.log(
        "Client Disconnected. Total clients: ",
        socketsManager.engine.clientsCount - 1
      ); // That client is about to disconnect, but is still connected, thus the minus one.
    });
  });
}

module.exports = {
  init,
};
