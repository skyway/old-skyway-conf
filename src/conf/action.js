import { reaction } from 'mobx';
import Mousetrap from 'mousetrap';
import vad from 'voice-activity-detection';

import Action from '../shared/action';
import webrtc from './helper/webrtc';
import skyway from './helper/skyway';

class ConfAction extends Action {
  constructor(store) {
    super(store);

    this._destroyVad = null;

    const { user, room, ui } = this.store;

    reaction(
      () => [user.videoDeviceId, user.audioDeviceId],
      async ([videoDeviceId, audioDeviceId]) => {
        const stream = await webrtc
          .getUserMedia({ videoDeviceId, audioDeviceId })
          .catch(err => ui.handleGetUserMediaError(err));

        if (ui.isError) {
          return;
        }

        // stop previous stream if exist
        if (room.localStream instanceof MediaStream) {
          webrtc.stopStream(room.localStream);
        }

        // once got media, it's ready
        ui.isAppReady = true;

        // apply current status before set
        user.isVideoMuted && webrtc.setMuteVideoTracks(stream, true);
        user.isAudioMuted && webrtc.setMuteAudioTracks(stream, true);

        room.setLocalStream(stream);
      }
    );

    reaction(
      () => user.isVideoMuted,
      isMuted => webrtc.setMuteVideoTracks(room.localStream, isMuted)
    );
    reaction(
      () => user.isAudioMuted,
      isMuted => webrtc.setMuteAudioTracks(room.localStream, isMuted)
    );

    reaction(
      () => user.dispName,
      name => localStorage.setItem('SkyWayConf.dispName', name)
    );
    reaction(
      () => room.localStream,
      stream => {
        this._destroyVad && this._destroyVad();

        const { destroy } = vad(new AudioContext(), stream, {
          onUpdate(lv) {
            user.isSpeaking = lv !== 0;
          },
        });
        this._destroyVad = destroy;
      }
    );
  }

  async onLoad({ roomType, roomName }) {
    const { user, ui, room } = this.store;

    ui.setRoom({ roomType, roomName });
    const prevName = localStorage.getItem('SkyWayConf.dispName');
    prevName && (user.dispName = prevName);

    const devices = await webrtc
      .getUserDevices()
      .catch(err => ui.handleUserError(err));

    if (ui.isError) {
      return;
    }

    // this triggers reaction and get user media
    user.updateDevices(devices);
    // or enable to force enter without devices
    if (user.isNoVideoDevices && user.isNoAudioDevices) {
      ui.isAppReady = true;
      const fakeStream = webrtc.getFakeStream();
      room.setLocalStream(fakeStream);
    }

    // Safari's mediaDevices does not inherit EventTarget...
    // navigator.mediaDevices.addEventListener('devicechange', async () => {
    navigator.mediaDevices.ondevicechange = async () => {
      const devices = await webrtc
        .getUserDevices()
        .catch(err => ui.handleUserError(err));

      if (ui.isError) {
        return;
      }

      user.updateDevices(devices);
    };
    Mousetrap.bind(['command+e', 'ctrl+e'], () => {
      user.isVideoMuted = !user.isVideoMuted;
      return false;
    });
    Mousetrap.bind(['command+d', 'ctrl+d'], () => {
      user.isAudioMuted = !user.isAudioMuted;
      return false;
    });
  }

  async onClickJoinRoom() {
    const { ui, room, user } = this.store;

    const peer = await skyway.initPeer().catch(err => ui.handleAppError(err));

    if (ui.isError) {
      return;
    }

    peer.on('error', err => ui.handleSkyWayPeerError(err));
    user.peerId = peer.id;

    const confRoom = peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
      mode: ui.roomType,
      stream: room.localStream,
    });
    this._onRoomJoin(confRoom);

    ui.isSettingOpen = false;
  }

  async onChatEnterKeyDown() {
    const { chat, user, room, ui } = this.store;

    // avoid sending duplicate texts
    if (ui.isChatSending) {
      return;
    }
    if (chat.bufferText.length === 0) {
      return;
    }

    ui.isChatSending = true;
    const blob = await webrtc
      .snapVideoStream(room.localStream, 'image/jpeg', 0.5)
      .catch(err => ui.handleAppError(err));

    if (ui.isError) {
      return;
    }

    const payload = {
      peerId: user.peerId,
      text: chat.bufferText,
      blob,
      timestamp: Date.now(),
    };
    // sync local
    chat.addMessage(payload, user.dispName);
    // this triggers sync remotes
    chat.updateBuffer(payload);

    ui.isChatSending = false;
  }

  async startScreenShare() {
    const { ui, room, user } = this.store;

    if (skyway.isScreenShareAvailable() === false) {
      ui.isScreenShareIntroOpen = true;
      return;
    }

    let vTrack;
    try {
      vTrack = await skyway.getScreenStreamTrack();
    } catch (err) {
      if (err instanceof DOMException === false) {
        ui.isScreenShareIntroOpen = true;
      }
      console.error(err);
      return;
    }

    vTrack.addEventListener('ended', () => this.stopScreenShare(), {
      once: true,
    });
    // apply current status before set
    user.isVideoMuted && webrtc.setMuteTrack(vTrack, true);

    // this triggers stream replacement
    room.setScreenStreamTrack(vTrack);
    ui.isScreenSharing = true;
  }
  stopScreenShare() {
    const { ui, room } = this.store;

    room.setScreenStreamTrack(null);
    ui.isScreenSharing = false;
  }

  _onRoomJoin(confRoom) {
    const { ui, user, room, chat } = this.store;
    ui.isRoomJoin = true;

    confRoom.on('stream', stream => this._onRoomAddStream(stream, confRoom));
    confRoom.on('removeStream', stream => this._onRoomRemoveStream(stream));
    confRoom.on('peerLeave', peerId => this._onRoomPeerLeave(peerId));
    confRoom.on('data', data => this._onRoomData(data));

    reaction(
      () => room.localStream,
      () => confRoom.replaceStream(room.localStream)
    );
    reaction(
      () => user.syncState,
      state => confRoom.send({ type: 'sync', payload: state })
    );
    reaction(
      () => chat.lastMessage,
      msg => confRoom.send({ type: 'chat', payload: msg })
    );
  }
  _onRoomAddStream(stream, confRoom) {
    const { room, user } = this.store;
    room.addRemoteStream(stream);

    // return back state as welcome message
    confRoom.send({ type: 'sync', payload: user.syncState });
  }
  _onRoomRemoveStream(stream) {
    const { room } = this.store;
    room.removeRemoteStream(stream);
  }
  _onRoomPeerLeave(peerId) {
    const { room } = this.store;
    room.removeRemoteStreamByPeerId(peerId);
  }
  _onRoomData({ _src, data }) {
    const { room, chat } = this.store;
    const { type, payload } = data;
    switch (type) {
      case 'sync': {
        room.syncState.set(payload.peerId, payload);
        break;
      }
      case 'chat': {
        const syncState = room.syncState.get(payload.peerId);
        chat.addMessage(payload, syncState.dispName);
        break;
      }
      default:
        throw new Error(`${type} is not defined as message type`);
    }
  }
}

export default ConfAction;
