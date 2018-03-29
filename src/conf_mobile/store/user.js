import { decorate, observable, computed, runInAction } from 'mobx';

class UserStore {
  constructor() {
    this.peerId = 'YOUR_PEER_ID';
    this.dispName = 'YOUR_NAME';
    this.isVideoMuted = false;
    this.isAudioMuted = false;
    this.isSpeaking = false;
    this.videoDeviceId = '';
    this.audioDeviceId = '';
    this.videoDevices = [];
    this.audioDevices = [];
  }

  // XXX: assume there are at least 2 cameras on mobile device
  get facingMode() {
    if (this.videoDevices.length !== 2) {
      return 'environment';
    }

    // XXX: and assume videoDevices is [env, user] sorted
    return this.videoDeviceId === this.videoDevices[1].deviceId
      ? 'user'
      : 'environment';
  }

  get syncState() {
    return {
      peerId: this.peerId,
      dispName: this.dispName,
      isVideoMuted: this.isVideoMuted,
      isAudioMuted: this.isAudioMuted,
      isSpeaking: this.isSpeaking,
    };
  }

  get isNoVideoDevices() {
    return this.videoDevices.length === 0;
  }
  get isNoAudioDevices() {
    return this.audioDevices.length === 0;
  }

  updateDevices({ video, audio }) {
    runInAction(() => {
      this.videoDevices = video;
      this.audioDevices = audio;

      this._setDefaultDeviceIfNeeded();
    });
  }

  /**
   * Set default device ids if
   * - getting devices for the 1st time
   * - using device was ejected
   *
   */
  _setDefaultDeviceIfNeeded() {
    const videoDevice = this.videoDevices.find(
      device => device.deviceId === this.videoDeviceId
    );
    const audioDevice = this.audioDevices.find(
      device => device.deviceId === this.audioDeviceId
    );

    runInAction(() => {
      if (this.isNoVideoDevices === false) {
        videoDevice || (this.videoDeviceId = this.videoDevices[0].deviceId);
      }
      if (this.isNoAudioDevices === false) {
        audioDevice || (this.audioDeviceId = this.audioDevices[0].deviceId);
      }
    });
  }
}

decorate(UserStore, {
  peerId: observable,
  dispName: observable,
  isVideoMuted: observable,
  isAudioMuted: observable,
  isSpeaking: observable,

  videoDeviceId: observable,
  audioDeviceId: observable,
  videoDevices: observable.ref,
  audioDevices: observable.ref,

  syncState: computed,
  facingMode: computed,
  isNoVideoDevices: computed,
  isNoAudioDevices: computed,
});
export default UserStore;
