import { extendObservable, observable } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      localStream: observable.shallowObject({}),
      remoteStreams: observable.shallowArray([]),
    });
  }
}

export default RoomStore;
