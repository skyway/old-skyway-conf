import { extendObservable } from 'mobx';

class UiStore {
  constructor({ roomType, roomName }) {
    extendObservable(this, {
      roomType,
      roomName,
    });
  }

  set(key, val) {
    this[key] = val;
  }
}

export default UiStore;
