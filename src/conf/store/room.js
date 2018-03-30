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

  get pinnedPeerIdDisp() {
    if (this.pinnedPeerId.length !== 0) {
      return this.pinnedPeerId;
    }

    if (this.remoteStreams.length !== 0) {
      return this.remoteStreams[0].peerId;
    }

    return '';
  }

  get pinnedStream() {
    const pinned = this.remoteStreams.find(
      stream => stream.peerId === this.pinnedPeerIdDisp
    );
    if (pinned) {
      return pinned;
    }

    if (this.remoteStreams.length !== 0) {
      return this.remoteStreams[0];
    }

    return null;
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
      this.removeRemoteStream(oldStream);

      this.remoteStreams.push(stream);
    });
  }

  removeRemoteStreamByPeerId(peerId) {
    runInAction(() => {
      const stream = this.remoteStreams.find(
        stream => stream.peerId === peerId
      );
      this.removeRemoteStream(stream);

      this.syncState.delete(peerId);
      if (this.pinnedPeerId === peerId) {
        this.pinnedPeerId = '';
      }
    });
  }

  removeRemoteStream(stream) {
    stream && this.remoteStreams.remove(stream);
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
  pinnedPeerIdDisp: computed,
  pinnedStream: computed,
});
export default RoomStore;
