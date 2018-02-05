import { reaction, runInAction } from 'mobx';

import Action from '../shared/action';
import webrtc from './webrtc-helper';
import skyway from './skyway-helper';

class ConfAction extends Action {
  constructor(store) {
    super(store);

    const { device } = this.store;

    reaction(
      () => [device.videoDeviceId, device.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await webrtc
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(console.error);

        device.isVideoMuted && webrtc.toggleMuteVideoTracks(stream, true);
        device.isAudioMuted && webrtc.toggleMuteAudioTracks(stream, true);

        device.stream = stream;
      }
    );

    reaction(
      () => device.isVideoMuted,
      isMuted => webrtc.toggleMuteVideoTracks(device.stream, isMuted)
    );
    reaction(
      () => device.isAudioMuted,
      isMuted => webrtc.toggleMuteAudioTracks(device.stream, isMuted)
    );

    // TODO: 使ってたデバイスがなくなったら
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      const { video, audio } = await webrtc
        .getUserDevices()
        .catch(console.error);

      runInAction(() => {
        device.videoDevices = video;
        device.audioDevices = audio;
      });
    });
  }

  async onLoad() {
    const { device } = this.store;
    const { video, audio } = await webrtc.getUserDevices().catch(console.error);

    runInAction(() => {
      device.videoDevices = video;
      device.audioDevices = audio;

      // temp devices for first gUM()
      device.videoDeviceId = video[0].deviceId;
      device.audioDeviceId = audio[0].deviceId;
    });
  }

  async onChangeVideoDevice(deviceId) {
    const { device } = this.store;
    device.videoDeviceId = deviceId;
  }
  async onChangeAudioDevice(deviceId) {
    const { device } = this.store;
    device.audioDeviceId = deviceId;
  }

  onClickVideoMute() {
    const { device } = this.store;
    device.isVideoMuted = !device.isVideoMuted;
  }
  onClickAudioMute() {
    const { device } = this.store;
    device.isAudioMuted = !device.isAudioMuted;
  }

  async onClickJoinRoom() {
    const { ui, device } = this.store;

    const peer = await skyway.initPeer().catch(console.error);
    const room = peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
      mode: ui.roomType,
      stream: device.stream,
    });
    this._onRoomJoin(room);

    ui.isSettingOpen = false;
  }

  _onRoomJoin(room) {
    const { ui, device } = this.store;
    ui.isRoomJoin = true;

    room.on('stream', stream => this._onRoomAddStream(stream));
    room.on('removeStream', stream => this._onRoomRemoveStream(stream));
    room.on('peerLeave', peerId => this._onRoomPeerLeave(peerId));
    room.on('data', data => this._onRoomData(data));

    reaction(() => device.stream, () => room.replaceStream(device.stream));
  }
  _onRoomAddStream(stream) {
    const { room } = this.store;
    room.streams.push(stream);
  }
  _onRoomRemoveStream(stream) {
    const { room } = this.store;
    room.streams.remove(stream);
  }
  _onRoomPeerLeave(peerId) {
    const { room } = this.store;
    const stream = room.streams.find(stream => stream.peerId === peerId);
    stream && room.streams.remove(stream);
  }
  _onRoomData(data) {
    console.log('data', data);
  }
}

export default ConfAction;
