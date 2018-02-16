import { extendObservable, observable, runInAction } from 'mobx';

class RoomStore {
  constructor() {
    extendObservable(this, {
      syncState: new Map(),
      pinnedPeerId: '',
      localVideoStreamTrack: observable.shallowObject({}),
      localAudioStreamTrack: observable.shallowObject({}),
      remoteStreams: observable.shallowArray([]),

      get localStream() {
        if (
          (this.localVideoStreamTrack instanceof MediaStreamTrack &&
            this.localAudioStreamTrack instanceof MediaStreamTrack) === false
        ) {
          return new MediaStream();
        }
        return new MediaStream([
          this.localVideoStreamTrack,
          this.localAudioStreamTrack,
        ]);
      },
      get pinnedStream() {
        return (
          this.remoteStreams.find(
            stream => stream.peerId === this.pinnedPeerId
          ) || this.localStream
        );
      },
    });
  }

  setLocalStream(stream) {
    const [vTrack] = stream.getVideoTracks();
    const [aTrack] = stream.getAudioTracks();

    runInAction(() => {
      this.localVideoStreamTrack = vTrack;
      this.localAudioStreamTrack = aTrack;
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
