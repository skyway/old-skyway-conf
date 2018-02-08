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

  removeRemoteStreamByPeerId(peerId) {
    runInAction(() => {
      const stream = this.remoteStreams.find(
        stream => stream.peerId === peerId
      );
      stream && this.removeRemoteStream(stream);

      this.syncState.delete(peerId);
      if (this.pinnedPeerId === peerId) {
        this.pinnedPeerId = '';
      }
    });
  }

  removeRemoteStream(stream) {
    this.remoteStreams.remove(stream);
  }
}

export default RoomStore;
