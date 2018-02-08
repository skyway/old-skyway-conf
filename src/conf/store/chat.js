import { extendObservable, observable } from 'mobx';

class ChatStore {
  constructor() {
    extendObservable(this, {
      bufferText: '',
      lastMessage: observable.shallowObject({}),
      messages: observable.shallowArray([]),
    });
  }

  addMessage({ text, thumb, timestamp, peerId }, dispName) {
    this.messages.push({
      id: `${peerId}-${timestamp}`,
      text,
      thumb,
      dispName,
      dispDate: new Date(timestamp).toLocaleTimeString().slice(0, 5),
    });
  }
}

export default ChatStore;
