import { reaction } from 'mobx';

import Action from '../shared/action';
// import Peer from 'skyway-js';
// function _initPeer() {
//   return new Promise((resolve, reject) => {
//     const peer = new Peer({
//       key: '03ff6219-b58f-4310-9484-e9108e859cdd',
//       debug: 2,
//     });
//
//     peer.on('open', () => {
//       resolve(peer);
//     });
//     // for onOpen error
//     peer.on('error', err => {
//       reject(err);
//     });
//
//     window.peer = peer;
//   });
// }
class RoomAction extends Action {
  constructor(store) {
    super(store);

    const { peer } = this.store;

    reaction(
      () => `${peer.videoDeviceId}-${peer.audioDeviceId}`,
      async () => {
        const stream = await navigator.mediaDevices
          .getUserMedia({
            video: { deviceId: peer.videoDeviceId },
            audio: { deviceId: peer.audioDeviceId },
          })
          .catch(console.error);

        // TODO: check muted or NOT
        peer.stream = stream;
      }
    );

    reaction(
      () => peer.isVideoMuted,
      isMuted => {
        peer.stream
          .getVideoTracks()
          .forEach(track => (track.enabled = !isMuted));
      }
    );
    reaction(
      () => peer.isAudioMuted,
      isMuted => {
        peer.stream
          .getAudioTracks()
          .forEach(track => (track.enabled = !isMuted));
      }
    );

    // TODO: 使ってたデバイスがなくなったら
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      const devices = await navigator.mediaDevices
        .enumerateDevices()
        .catch(console.error);
      peer.updateUserDevices(devices);
    });
  }

  async onLoad() {
    const { peer } = this.store;
    const devices = await navigator.mediaDevices
      .enumerateDevices()
      .catch(console.error);
    peer.updateUserDevices(devices);

    // temp devices for first gUM()
    peer.videoDeviceId = peer.videoDevices[0].deviceId;
    peer.audioDeviceId = peer.audioDevices[0].deviceId;
  }

  async onChangeVideoDevice(deviceId) {
    const { peer } = this.store;
    peer.videoDeviceId = deviceId;
  }
  async onChangeAudioDevice(deviceId) {
    const { peer } = this.store;
    peer.audioDeviceId = deviceId;
  }

  onClickVideoMute() {
    const { peer } = this.store;
    peer.isVideoMuted = !peer.isVideoMuted;
  }
  onClickAudioMute() {
    const { peer } = this.store;
    peer.isAudioMuted = !peer.isAudioMuted;
  }

  onClickJoinRoom() {
    const { ui } = this.store;
    console.log(`join: ${ui.roomType}/${ui.roomName}`);
  }
}

export default RoomAction;
