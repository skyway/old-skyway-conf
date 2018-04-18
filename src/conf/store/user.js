import { decorate, observable, computed, runInAction } from 'mobx';

class UserStore {
  constructor() {
    this.peerId = 'YOUR_PEER_ID';
    this.dispName = 'YOUR_NAME';
    this.isVideoMuted = false;
    this.isAudioMuted = true;
    this.isSpeaking = false;
    this.videoDeviceId = '';
    this.audioDeviceId = '';
    this.videoDevices = [];
    this.audioDevices = [];
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
  isNoVideoDevices: computed,
  isNoAudioDevices: computed,
});
export default UserStore;
