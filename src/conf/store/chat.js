import { extendObservable, observable } from 'mobx';

class ChatStore {
  constructor() {
    extendObservable(this, {
      bufferText: '',
      lastMessage: observable.shallowObject({}),
      messages: observable.shallowArray([]),
    });
  }

  addMessage(message, dispName) {
    const date = new Date(message.timestamp);
    const dispDate = `${date.getHours()}:${date.getMinutes()}`;
    this.messages.push({
      text: message.text,
      thumb: message.thumb,
      id: `${message.peerId}-${message.timestamp}`,
      dispName,
      dispDate,
    });
  }
}

export default ChatStore;
