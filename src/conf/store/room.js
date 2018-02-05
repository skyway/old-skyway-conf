import { extendObservable, observable } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      pinnedStreamId: '',
      localStream: observable.shallowObject({}),
      remoteStreams: observable.shallowArray([]),
      get pinnedStream() {
        if (this.pinnedStreamId !== '') {
          return this.remoteStreams.find(
            stream => stream.id === this.pinnedStreamId
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
    if (this.pinnedStreamId === stream.id) {
      this.pinnedStreamId = '';
    }
  }

  removeRemoteStreamByPeerId(peerId) {
    const stream = this.remoteStreams.find(stream => stream.peerId === peerId);
    stream && this.removeRemoteStream(stream);
  }
}

export default RoomStore;
