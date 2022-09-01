import { useState } from "react";
import { io, Socket } from "socket.io-client";
import "./TestSocket.css";

let socket: Socket;

function TestSocket(): JSX.Element {
  const [message, setMessage] = useState<string>();

  function connect(): void {
    // 2. Connect to backend:
    socket = io("http://localhost:3001");

    // 5. Listen to messages from server:
    socket.on("msg-from-server", (obj) => {
      setMessage(obj.text + " " + obj.num);
    });
  }

  function send(): void {
    // 4. Send message to backend:
    socket.emit("msg-from-client", "Hello!");
  }

  function disconnect(): void {
    // Disconnect:
    socket.disconnect();
  }

  return (
    <div className="TestSocket">
      <button onClick={connect}>Connect</button>
      <button onClick={send}>Send Message</button>
      <button onClick={disconnect}>Disconnect</button>
      <p>{message}</p>
    </div>
  );
}

export default TestSocket;
