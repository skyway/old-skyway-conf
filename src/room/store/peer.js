import { extendObservable, observable } from 'mobx';

class PeerStore {
  constructor() {
    extendObservable(this, {
      isOpen: false,
      stream: observable.shallowObject({}),
      peer: observable.shallowObject({}),
    });
  }

  set(key, val) {
    if (key in this === false) {
      throw new Error(`${key} is not defined!`);
    }
    this[key] = val;
  }
}

export default PeerStore;
