import { extendObservable, observable } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      pinnedStreamId: '',
      localStream: observable.shallowObject({}),
      remoteStreams: observable.shallowArray([]),
      get pinnedStream() {
        if (this.pinnedStreamId === '') {
          return this.localStream;
        }
        return (
          this.remoteStreams.find(
            stream => stream.id === this.pinnedStreamId
          ) || this.localStream
        );
      },
    });
  }
}

export default RoomStore;
