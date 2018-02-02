import { extendObservable, observable } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      streams: observable.shallowArray([]),
    });
  }
}

export default RoomStore;
