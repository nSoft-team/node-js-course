import { io, Socket } from "socket.io-client";
import MessageModel from "../Models/MessageModel";

class ChatService {
  private socket: Socket;

  public connect(gotMessageCallback: Function): void {
    this.socket = io("http://localhost:3001");
    this.socket.on("msg-from-server", (msg: MessageModel) => {
      // If we have a global state:
      // Update the global state (Redux) with this message.
      // Redux will then notify all subscribers.

      // If we don't have a global state - getting a callback as an argument
      // and calling that callback:

      gotMessageCallback(msg);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public send(msg: MessageModel): void {
    this.socket.emit("msg-from-client", msg);
  }
}

const chatService = new ChatService();

export default chatService;
