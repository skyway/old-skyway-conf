import { extendObservable, observable, runInAction } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      syncState: new Map(),
      pinnedPeerId: '',
      localStream: observable.shallowObject({}),
      remoteStreams: observable.shallowArray([]),
      get pinnedStream() {
        if (this.pinnedPeerId !== '') {
          return this.remoteStreams.find(
            stream => stream.peerId === this.pinnedPeerId
          );
        }

        if (this.remoteStreams.length !== 0) {
          return this.remoteStreams[0];
        }

        return this.localStream;
      },
    });
  }

  removeRemoteStream(stream) {
    runInAction(() => {
      this.remoteStreams.remove(stream);
      this.syncState.delete(stream.peerId);
      if (this.pinnedPeerId === stream.peerId) {
        this.pinnedPeerId = '';
      }
    });
  }
}

export default RoomStore;
