import { extendObservable } from 'mobx';

class UiStore {
  constructor({ roomType, roomName }) {
    extendObservable(this, {
      roomType,
      roomName,
      isSetting: true,
      hasError: null,
    });
  }
}

export default UiStore;
