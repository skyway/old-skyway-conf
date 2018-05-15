import { decorate, observable, action } from 'mobx';

class ChatStore {
  constructor() {
    this.bufferText = '';
    this.lastMessage = {};
    this.messages = [];
  }

  addMessage({ text, timestamp, peerId }, thumb, dispName) {
    this.messages.push({
      id: `${peerId}-${timestamp}`,
      text,
      dispDate: new Date(timestamp).toLocaleTimeString().slice(0, 5),
      thumb,
      dispName,
    });
  }

  updateBuffer(payload) {
    // this triggers sync remotes
    this.lastMessage = payload;
    this.bufferText = '';
  }
}

decorate(ChatStore, {
  bufferText: observable,
  lastMessage: observable.ref,
  messages: observable.shallow,
  updateBuffer: action,
});
export default ChatStore;
