import { decorate, observable, computed, runInAction } from 'mobx';

class RoomStore {
  constructor() {
    this.syncState = new Map();
    this.pinnedPeerId = '';
    this.localVideoStreamTrack = {};
    this.localScreenStreamTrack = {};
    this.localAudioStreamTrack = {};
    this.remoteStreams = [];
  }

  get localStream() {
    const ms = new MediaStream();

    if (this.localAudioStreamTrack instanceof MediaStreamTrack) {
      ms.addTrack(this.localAudioStreamTrack);
    }

    // return with either video
    if (this.localScreenStreamTrack instanceof MediaStreamTrack) {
      ms.addTrack(this.localScreenStreamTrack);
    } else if (this.localVideoStreamTrack instanceof MediaStreamTrack) {
      ms.addTrack(this.localVideoStreamTrack);
    }

    return ms;
  }

  get pinnedStream() {
    return (
      this.remoteStreams.find(stream => stream.peerId === this.pinnedPeerId) ||
      this.localStream
    );
  }

  setLocalStream(stream) {
    const [vTrack] = stream.getVideoTracks();
    const [aTrack] = stream.getAudioTracks();

    runInAction(() => {
      this.localVideoStreamTrack = vTrack;
      this.localAudioStreamTrack = aTrack;
    });
  }

  setScreenStreamTrack(track) {
    if (track instanceof MediaStreamTrack) {
      // start
      this.localScreenStreamTrack = track;
    } else {
      // stop
      this.localScreenStreamTrack.stop();
      this.localScreenStreamTrack = {};
    }
  }

  addRemoteStream(stream) {
    runInAction(() => {
      // XXX: need to restrict 1stream/1peer
      // room#removeStream does not fire on Chrome when Firefox replaces stream w/ screen share
      const oldStream = this.remoteStreams.find(
        oStream => oStream.peerId === stream.peerId
      );
      oldStream && this.removeRemoteStream(oldStream);

      this.remoteStreams.push(stream);
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
    const idx = this.remoteStreams.indexOf(stream);
    this.remoteStreams.splice(idx, 1);
  }
}

decorate(RoomStore, {
  syncState: observable,
  pinnedPeerId: observable,
  localVideoStreamTrack: observable.ref,
  localScreenStreamTrack: observable.ref,
  localAudioStreamTrack: observable.ref,
  remoteStreams: observable.shallow,
  localStream: computed,
  pinnedStream: computed,
});
export default RoomStore;
