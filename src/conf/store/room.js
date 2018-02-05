import { extendObservable, observable } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
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
    this.remoteStreams.remove(stream);
    if (this.pinnedPeerId === stream.peerId) {
      this.pinnedPeerId = '';
    }
  }

  removeRemoteStreamByPeerId(peerId) {
    const stream = this.remoteStreams.find(stream => stream.peerId === peerId);
    stream && this.removeRemoteStream(stream);
  }
}

export default RoomStore;
