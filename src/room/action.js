import { reaction, runInAction } from 'mobx';

import Action from '../shared/action';
import webrtc from './webrtc-helper';
import skyway from './skyway-helper';

class RoomAction extends Action {
  constructor(store) {
    super(store);

    const { self } = this.store;

    reaction(
      () => [self.videoDeviceId, self.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await webrtc
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(console.error);

        self.isVideoMuted && webrtc.toggleMuteVideoTracks(stream, true);
        self.isAudioMuted && webrtc.toggleMuteAudioTracks(stream, true);

        self.stream = stream;
      }
    );

    reaction(
      () => self.isVideoMuted,
      isMuted => webrtc.toggleMuteVideoTracks(self.stream, isMuted)
    );
    reaction(
      () => self.isAudioMuted,
      isMuted => webrtc.toggleMuteAudioTracks(self.stream, isMuted)
    );

    // TODO: 使ってたデバイスがなくなったら
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      const { video, audio } = await webrtc
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
    const { video, audio } = await webrtc.getUserDevices().catch(console.error);

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

  async onClickJoinRoom() {
    const { ui, self } = this.store;

    const peer = await skyway.initPeer().catch(console.error);
    const room = peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
      mode: ui.roomType,
      stream: self.stream,
    });

    room.on('stream', stream => console.log(stream));
    room.on('removeStream', stream => console.log(stream));
    room.on('peerLeave', peerId => console.log(peerId));
    room.on('data', data => console.log(data));

    // TODO: debug
    window.p = peer;
    window.r = room;

    ui.isSettingOpen = false;
    console.log(`joined: ${ui.roomType}/${ui.roomName}`);
  }
}

export default RoomAction;
