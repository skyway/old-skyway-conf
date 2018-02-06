import { reaction, runInAction } from 'mobx';

import Action from '../shared/action';
import webrtc from './helper/webrtc';
import skyway from './helper/skyway';

class ConfAction extends Action {
  constructor(store) {
    super(store);

    const { device, room } = this.store;

    reaction(
      () => [device.videoDeviceId, device.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await webrtc
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(console.error);

        device.isVideoMuted && webrtc.toggleMuteVideoTracks(stream, true);
        device.isAudioMuted && webrtc.toggleMuteAudioTracks(stream, true);

        stream.peerId = 'myPeerId';
        room.localStream = stream;
      }
    );

    reaction(
      () => device.isVideoMuted,
      isMuted => webrtc.toggleMuteVideoTracks(room.localStream, isMuted)
    );
    reaction(
      () => device.isAudioMuted,
      isMuted => webrtc.toggleMuteAudioTracks(room.localStream, isMuted)
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

  onClickToggleVideoMute() {
    const { device } = this.store;
    device.isVideoMuted = !device.isVideoMuted;
  }
  onClickToggleAudioMute() {
    const { device } = this.store;
    device.isAudioMuted = !device.isAudioMuted;
  }

  async onClickJoinRoom() {
    const { ui, room } = this.store;

    const peer = await skyway.initPeer().catch(console.error);
    const confRoom = peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
      mode: ui.roomType,
      stream: room.localStream,
    });
    this._onRoomJoin(confRoom);

    ui.isSettingOpen = false;
  }

  onClickRemotePeer(peerId) {
    const { room } = this.store;
    room.pinnedPeerId = peerId;
  }

  _onRoomJoin(confRoom) {
    const { ui, room } = this.store;
    ui.isRoomJoin = true;

    confRoom.on('stream', stream => this._onRoomAddStream(stream));
    confRoom.on('removeStream', stream => this._onRoomRemoveStream(stream));
    confRoom.on('peerLeave', peerId => this._onRoomPeerLeave(peerId));
    confRoom.on('data', data => this._onRoomData(data));

    reaction(
      () => room.localStream,
      () => confRoom.replaceStream(room.localStream)
    );
  }
  _onRoomAddStream(stream) {
    const { room } = this.store;
    room.remoteStreams.push(stream);
  }
  _onRoomRemoveStream(stream) {
    const { room } = this.store;
    room.removeRemoteStream(stream);
  }
  _onRoomPeerLeave(peerId) {
    const { room } = this.store;
    room.removeRemoteStreamByPeerId(peerId);
  }
  _onRoomData(data) {
    console.log('data', data);
  }
}

export default ConfAction;
