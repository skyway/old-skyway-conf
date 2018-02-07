import { extendObservable, observable } from 'mobx';

import util from '../../shared/util';

class ChatStore {
  constructor() {
    extendObservable(this, {
      messages: observable.shallowArray([]),
      tempMsg: '',
    });
  }

  addMessage(message) {
    const id = util.randomId();
    const timestamp = Date.now();
    this.messages.push(Object.assign({ id, timestamp }, message));
  }
}

export default ChatStore;
