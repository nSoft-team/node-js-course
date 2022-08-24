import { Component, SyntheticEvent } from "react";
import chatService from "../../Services/ChatService";
import "./Chat.css";

interface ChatState {
    myMessage: string;
    allMessages: string[];
}

class Chat extends Component<{}, ChatState> {

    public constructor(props: {}) {
        super(props);
        this.state = { myMessage: "", allMessages: [] };
    }

    private connect = () => {
        chatService.connect(msg => {
            const allMessages = [...this.state.allMessages];
            allMessages.push(msg);
            this.setState({ allMessages });
        });
    }

    private disconnect = () => {
        chatService.disconnect();
    }

    private msgHandler = (args: SyntheticEvent) => {
        const myMessage = (args.target as HTMLInputElement).value;
        this.setState({ myMessage });
    }

    private send = () => {
        chatService.send(this.state.myMessage);
        this.setState({ myMessage: "" });
    }

    public render(): JSX.Element {
        return (
            <div className="Chat">

                <h1>Socket.io Chat</h1>

                <button onClick={this.connect}>Connect</button>
                <button onClick={this.disconnect}>Disconnect</button>
                <br /><br />

                <label>Message: </label>
                <input type="text" onChange={this.msgHandler} value={this.state.myMessage} />
                <button onClick={this.send}>Send</button>
                <br /><br />

                <div>
                    {this.state.allMessages.map((msg, index) => <div key={index}>{msg}</div>)}
                </div>

            </div>
        );
    }
}

export default Chat;
