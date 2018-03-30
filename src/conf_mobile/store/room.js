import { decorate, observable, computed, runInAction } from 'mobx';

class RoomStore {
  constructor() {
    this.syncState = new Map();
    this.pinnedPeerId = '';
    this.localStream = {};
    this.remoteStreams = [];
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
    this.localStream = stream;
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
  localStream: observable.ref,
  remoteStreams: observable.shallow,
  pinnedPeerIdDisp: computed,
  pinnedStream: computed,
});
export default RoomStore;
