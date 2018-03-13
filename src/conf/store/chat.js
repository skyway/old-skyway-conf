import { decorate, observable, runInAction } from 'mobx';

class ChatStore {
  constructor() {
    this.bufferText = '';
    this.lastMessage = {};
    this.messages = [];
  }

  addMessage({ text, blob, timestamp, peerId }, dispName) {
    // from remotes
    if (blob instanceof ArrayBuffer) {
      blob = new Blob([new Uint8Array(blob)]);
    }

    this.messages.push({
      id: `${peerId}-${timestamp}`,
      text,
      thumb: URL.createObjectURL(blob),
      dispDate: new Date(timestamp).toLocaleTimeString().slice(0, 5),
      dispName,
    });
  }

  updateBuffer(payload) {
    runInAction(() => {
      // this triggers sync remotes
      this.lastMessage = payload;
      this.bufferText = '';
    });
  }
}

decorate(ChatStore, {
  bufferText: observable,
  lastMessage: observable.shallow,
  messages: observable.shallow,
});
export default ChatStore;
