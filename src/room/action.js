import { reaction, runInAction } from 'mobx';

import Action from '../shared/action';
import helper from './webrtc-helper';
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
      () => [peer.videoDeviceId, peer.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await helper
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(console.error);

        peer.isVideoMuted && helper.toggleMuteVideoTracks(stream, true);
        peer.isAudioMuted && helper.toggleMuteAudioTracks(stream, true);

        peer.stream = stream;
      }
    );

    reaction(
      () => peer.isVideoMuted,
      isMuted => helper.toggleMuteVideoTracks(peer.stream, isMuted)
    );
    reaction(
      () => peer.isAudioMuted,
      isMuted => helper.toggleMuteAudioTracks(peer.stream, isMuted)
    );

    // TODO: 使ってたデバイスがなくなったら
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      const { video, audio } = await helper
        .getUserDevices()
        .catch(console.error);

      runInAction(() => {
        peer.videoDevices = video;
        peer.audioDevices = audio;
      });
    });
  }

  async onLoad() {
    const { peer } = this.store;
    const { video, audio } = await helper.getUserDevices().catch(console.error);

    runInAction(() => {
      peer.videoDevices = video;
      peer.audioDevices = audio;

      // temp devices for first gUM()
      peer.videoDeviceId = video[0].deviceId;
      peer.audioDeviceId = audio[0].deviceId;
    });
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
    ui.isSettingOpen = false;
    console.log(`join: ${ui.roomType}/${ui.roomName}`);
  }
}

export default RoomAction;
