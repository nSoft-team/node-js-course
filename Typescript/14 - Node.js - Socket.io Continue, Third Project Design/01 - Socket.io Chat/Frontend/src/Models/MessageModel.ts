class MessageModel {
  public text: string;
  public nickName: string;

  public constructor(text: string, nickName: string) {
    this.text = text;
    this.nickName = nickName;
  }
}

export default MessageModel;
