import { reaction, when } from 'mobx';
import Mousetrap from 'mousetrap';
import vad from 'voice-activity-detection';

import Action from '../shared/action';
import webrtc from '../shared/util/webrtc';
import skyway from '../shared/util/skyway';
import bom from '../shared/util/bom';

class ConfAction extends Action {
  constructor(store) {
    super(store);

    this._peer = null;
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
      isMuted => {
        webrtc.setMuteAudioTracks(room.localStream, isMuted);

        // need to resume audio context by user gesture
        const ctx = bom.getAudioCtx(window);
        ctx.state === 'suspended' && ctx.resume();
      }
    );

    reaction(
      () => user.dispName,
      name => localStorage.setItem('SkyWayConf.dispName', name)
    );

    reaction(
      () => room.localStream,
      stream => {
        this._destroyVad && this._destroyVad();

        const { destroy } = vad(bom.getAudioCtx(window), stream, {
          onUpdate(lv) {
            user.isSpeaking = lv !== 0;
          },
        });
        this._destroyVad = destroy;
      }
    );

    // reload device labels after 1st time getUserMedia()
    when(
      () => ui.isAppReady,
      async () => {
        const devices = await webrtc
          .getUserDevices()
          .catch(err => ui.handleUserError(err));

        if (ui.isError) {
          return;
        }

        user.updateDevices(devices);
      }
    );
  }

  async onLoad({ roomType, roomName, browser }) {
    const { user, ui, room } = this.store;

    ui.setRoom({ roomType, roomName, browser });
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
      const fakeStream = webrtc.getFakeStream(bom.getAudioCtx(window));
      room.setLocalStream(fakeStream);
    }

    // XXX: Safari's mediaDevices does not inherit EventTarget..
    // navigator.mediaDevices.addEventListener('devicechange', async () => {
    navigator.mediaDevices.ondevicechange = async function() {
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

    this._peer = await skyway.initPeer().catch(err => ui.handleAppError(err));

    if (ui.isError) {
      return;
    }

    this._peer.on('error', err => ui.handleUserError(err));
    user.peerId = this._peer.id;

    const confRoom = this._peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
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
    const thumb = URL.createObjectURL(blob);
    chat.addMessage(payload, thumb, user.dispName);
    // this triggers sync remotes
    chat.updateBuffer(payload);

    ui.isChatSending = false;
  }

  async startScreenShare(mediaSource) {
    const { ui, room, user } = this.store;

    if (skyway.isScreenShareAvailable() === false) {
      ui.isScreenShareIntroOpen = true;
      return;
    }

    let vTrack;
    try {
      vTrack = await skyway.getScreenStreamTrack({ mediaSource });
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
    ui.isScreenShareTriggerOpen = false;
  }
  stopScreenShare() {
    const { ui, room } = this.store;

    room.setScreenStreamTrack(null);
    ui.isScreenSharing = false;
  }

  _onRoomJoin(confRoom) {
    const { ui, user, room, chat } = this.store;
    ui.isRoomJoin = true;

    const roomDisposers = [];
    roomDisposers.push(
      reaction(
        () => room.localStream,
        localStream => confRoom.replaceStream(localStream)
      ),
      reaction(
        () => user.syncState,
        state => confRoom.send({ type: 'sync', payload: state })
      ),
      reaction(
        () => chat.lastMessage,
        msg => confRoom.send({ type: 'chat', payload: msg })
      )
    );

    confRoom.on('stream', stream => this._onRoomAddStream(stream, confRoom));
    confRoom.on('removeStream', stream => this._onRoomRemoveStream(stream));
    confRoom.on('peerLeave', peerId => this._onRoomPeerLeave(peerId));
    confRoom.on('data', data => this._onRoomData(data));
    confRoom.on('close', () => this._onRoomClose(confRoom, roomDisposers));
  }
  _onRoomAddStream(stream, confRoom) {
    const { room, user, notification } = this.store;
    room.addRemoteStream(stream);

    // return back state as welcome message
    confRoom.send({ type: 'sync', payload: user.syncState });

    // need to wait until syncState is sent back from remotes
    when(
      () => room.syncState.get(stream.peerId) !== undefined,
      () => notification.showJoin(room.syncState.get(stream.peerId))
    );
  }
  _onRoomRemoveStream(stream) {
    const { room } = this.store;
    room.removeRemoteStream(stream);
  }
  _onRoomPeerLeave(peerId) {
    const { room, notification } = this.store;

    const syncState = room.syncState.get(peerId);
    notification.showLeave(syncState);

    room.removeRemoteStreamByPeerId(peerId);
  }
  _onRoomData({ _src, data }) {
    const { room, chat, ui, notification } = this.store;
    const { type, payload } = data;
    switch (type) {
      case 'sync': {
        room.syncState.set(payload.peerId, payload);
        break;
      }
      case 'chat': {
        const syncState = room.syncState.get(payload.peerId);
        const blob = new Blob([new Uint8Array(payload.blob)]);
        const thumb = URL.createObjectURL(blob);
        chat.addMessage(payload, thumb, syncState.dispName);
        ui.isChatOpen || notification.showChat(syncState);
        break;
      }
      default:
        throw new Error(`${type} is not defined as message type`);
    }
  }
  _onRoomClose(confRoom, roomDisposers) {
    const { room, ui, notification } = this.store;

    // room will close when iceConnectionState === failed
    // at first, need to notify it locally
    notification.showStat('Your connection closed, trying to reconnect...');

    // try to reconnect, clean up related stuff
    confRoom.removeAllListeners();
    roomDisposers.forEach(dispose => dispose());
    room.removeAllRemoteStreams();

    // then join new room
    const newConfRoom = this._peer.joinRoom(`${ui.roomType}/${ui.roomName}`, {
      mode: ui.roomType,
      stream: room.localStream,
    });
    this._onRoomJoin(newConfRoom);
  }
}

export default ConfAction;
