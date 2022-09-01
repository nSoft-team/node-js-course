import { RefObject, SyntheticEvent, useRef, useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import chatService from "../../../Services/ChatService";
import "./Chat.css";

function Chat(): JSX.Element {
  // State for text box two-way-binding:
  const [text, setText] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  // Direct DOM access in React:
  const textBoxRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(); // In CC we can use createRef and not useRef

  // All messages sent from server:
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Connect to backend:
  function connect(): void {
    chatService.connect((msg: MessageModel) => {
      messages.push(msg);
      const newMessages = [...messages];
      setMessages(newMessages);
    });
  }

  // Disconnect from backend:
  function disconnect(): void {
    chatService.disconnect();
  }

  // Handle two-way-binding change:
  function handleTextChange(args: SyntheticEvent): void {
    const value = (args.target as HTMLInputElement).value;
    setText(value);
  }
  function handleNickNameChange(args: SyntheticEvent): void {
    const value = (args.target as HTMLInputElement).value;
    setNickName(value);
  }

  // Send message to backend:
  function send(): void {
    const message = new MessageModel(text, nickName);
    chatService.send(message);
    setText("");
    textBoxRef.current.focus(); // <-- accessing focus function directly to text box DOM object.
  }

  return (
    <div className="Chat">
      <input
        type="text"
        onChange={handleNickNameChange}
        value={nickName}
        placeholder="Nick Name..."
      />

      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <br />

      {/* onChange={handleChange} --> one way from text box to state,
            value={text} --> second way from state back to text box */}
      <input
        type="text"
        onChange={handleTextChange}
        value={text}
        placeholder="Message..."
        ref={textBoxRef}
      />
      <button onClick={send}>Send</button>

      <div className="Messages">
        {messages.map((m, index) => (
          <p key={index}>
            {m.nickName}: {m.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Chat;
