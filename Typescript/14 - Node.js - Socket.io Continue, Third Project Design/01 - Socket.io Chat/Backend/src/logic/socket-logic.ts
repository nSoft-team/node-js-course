import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

function socketLogic(httpServer: HttpServer): void {
  // Create socket server:
  const socketIoServer = new SocketIoServer(httpServer, {
    cors: { origin: "http://localhost:3000" },
  });

  // socketIoServer.sockets is a collection containing all connected sockets.

  // 1. Listen to clients connections (client want to create a connection to the server):
  socketIoServer.sockets.on("connection", (socket: Socket) => {
    console.log("Client has been connected");

    // 3. Listen to client messages:
    socket.on("msg-from-client", (msg) => {
      console.log("Client sent message: ", msg);

      // Send back the message to all sockets:
      socketIoServer.sockets.emit("msg-from-server", msg);
    });

    // Listen to client disconnect:
    socket.on("disconnect", () => {
      console.log("Client has been disconnect");
    });
  });
}

export default socketLogic;
