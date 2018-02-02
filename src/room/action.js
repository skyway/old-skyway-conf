import { reaction, runInAction } from 'mobx';

import Action from '../shared/action';
import helper from './webrtc-helper';
// import Peer from 'skyway-js';
// function _initPeer() {
//   return new Promise((resolve, reject) => {
//     const self = new Peer({
//       key: '03ff6219-b58f-4310-9484-e9108e859cdd',
//       debug: 2,
//     });
//
//     self.on('open', () => {
//       resolve(self);
//     });
//     // for onOpen error
//     self.on('error', err => {
//       reject(err);
//     });
//
//     window.self = self;
//   });
// }
class RoomAction extends Action {
  constructor(store) {
    super(store);

    const { self } = this.store;

    reaction(
      () => [self.videoDeviceId, self.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await helper
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(console.error);

        self.isVideoMuted && helper.toggleMuteVideoTracks(stream, true);
        self.isAudioMuted && helper.toggleMuteAudioTracks(stream, true);

        self.stream = stream;
      }
    );

    reaction(
      () => self.isVideoMuted,
      isMuted => helper.toggleMuteVideoTracks(self.stream, isMuted)
    );
    reaction(
      () => self.isAudioMuted,
      isMuted => helper.toggleMuteAudioTracks(self.stream, isMuted)
    );

    // TODO: 使ってたデバイスがなくなったら
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      const { video, audio } = await helper
        .getUserDevices()
        .catch(console.error);

      runInAction(() => {
        self.videoDevices = video;
        self.audioDevices = audio;
      });
    });
  }

  async onLoad() {
    const { self } = this.store;
    const { video, audio } = await helper.getUserDevices().catch(console.error);

    runInAction(() => {
      self.videoDevices = video;
      self.audioDevices = audio;

      // temp devices for first gUM()
      self.videoDeviceId = video[0].deviceId;
      self.audioDeviceId = audio[0].deviceId;
    });
  }

  async onChangeVideoDevice(deviceId) {
    const { self } = this.store;
    self.videoDeviceId = deviceId;
  }
  async onChangeAudioDevice(deviceId) {
    const { self } = this.store;
    self.audioDeviceId = deviceId;
  }

  onClickVideoMute() {
    const { self } = this.store;
    self.isVideoMuted = !self.isVideoMuted;
  }
  onClickAudioMute() {
    const { self } = this.store;
    self.isAudioMuted = !self.isAudioMuted;
  }

  onClickJoinRoom() {
    const { ui } = this.store;
    ui.isSettingOpen = false;
    console.log(`join: ${ui.roomType}/${ui.roomName}`);
  }
}

export default RoomAction;
