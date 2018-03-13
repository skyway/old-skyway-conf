import { extendObservable, runInAction } from 'mobx';

class ChatStore {
  constructor() {
    extendObservable(
      this,
      {
        bufferText: '',
        lastMessage: {},
        messages: [],
      },
      {},
      { deep: false }
    );
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

export default ChatStore;
