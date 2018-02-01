import { reaction } from 'mobx';
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

function RoomAction({ uiStore, peerStore }) {
  uiStore;
  reaction(
    () => `${peerStore.videoDeviceId}-${peerStore.audioDeviceId}`,
    async () => {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: peerStore.videoDeviceId },
          audio: { deviceId: peerStore.audioDeviceId },
        })
        .catch(console.error);
      peerStore.set('stream', stream);
    }
  );

  navigator.mediaDevices.addEventListener('devicechange', async () => {
    const devices = await navigator.mediaDevices
      .enumerateDevices()
      .catch(console.error);
    peerStore.updateUserDevices(devices);
    // TODO: 使ってたデバイスがなくなったら
  });

  return {
    async onLoad() {
      const devices = await navigator.mediaDevices
        .enumerateDevices()
        .catch(console.error);
      peerStore.updateUserDevices(devices);
      // temp devices for first gUM()
      peerStore.set('videoDeviceId', peerStore.videoDevices[0].deviceId);
      peerStore.set('audioDeviceId', peerStore.audioDevices[0].deviceId);
    },

    async onChangeVideoDevice(deviceId) {
      peerStore.set('videoDeviceId', deviceId);
    },

    async onChangeAudioDevice(deviceId) {
      peerStore.set('audioDeviceId', deviceId);
    },
  };
}

export default RoomAction;
