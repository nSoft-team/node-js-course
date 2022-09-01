import { Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

function socketLogic(httpServer: HttpServer): void {
  // Create socket server:
  const socketIoServer = new SocketIoServer(httpServer, {
    cors: { origin: "http://localhost:3000" },
  });

  // 1. Listen to clients connections (client want to create a connection to the server):
  socketIoServer.sockets.on("connection", (socket: Socket) => {
    console.log("Client has been connected");

    // 3. Listen to client messages:
    socket.on("msg-from-client", (msg) => {
      console.log("Client sent message: " + msg);
    });

    const timerId = setInterval(() => {
      // 6. Send message to client:
      const obj = {
        text: "Random number from server",
        num: Math.floor(Math.random() * 100),
      };
      socket.emit("msg-from-server", obj);
    }, 1000);

    // Listen to client disconnect:
    socket.on("disconnect", () => {
      console.log("Client has been disconnect");
      clearInterval(timerId);
    });
  });
}

export default socketLogic;
