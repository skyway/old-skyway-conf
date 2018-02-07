import { extendObservable, observable } from 'mobx';

import util from '../../shared/util';

class ChatStore {
  constructor() {
    extendObservable(this, {
      messages: observable.shallowArray([]),
      tempMsg: '',
    });
  }

  addMessage({ from, text, thumb }) {
    const id = util.randomId();
    const timestamp = Date.now();
    this.messages.push({ from, text, thumb, timestamp, id });
  }
}

export default ChatStore;
