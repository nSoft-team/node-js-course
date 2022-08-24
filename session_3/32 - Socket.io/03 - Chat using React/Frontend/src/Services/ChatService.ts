import { io, Socket } from "socket.io-client"; // npm i socket.io-client

class ChatService {

    private socket: Socket;

    public connect(displayMessage: (msg: string) => void): void {
        this.socket = io("http://localhost:3001");
        this.socket.on("msg-from-server", msg => displayMessage(msg));
    }

    public send(msg: string): void {
        this.socket.emit("msg-from-client", msg);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const chatService = new ChatService();

export default chatService;
