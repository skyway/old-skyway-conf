import { extendObservable, runInAction } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(
      this,
      {
        peerId: 'YOUR_PEER_ID',
        dispName: 'YOUR_NAME',
        isVideoMuted: false,
        isAudioMuted: false,
        isSpeaking: false,

        videoDeviceId: '',
        audioDeviceId: '',
        videoDevices: [],
        audioDevices: [],

        get syncState() {
          return {
            peerId: this.peerId,
            dispName: this.dispName,
            isVideoMuted: this.isVideoMuted,
            isAudioMuted: this.isAudioMuted,
            isSpeaking: this.isSpeaking,
          };
        },
        get isNoVideoDevices() {
          return this.videoDevices.length === 0;
        },
        get isNoAudioDevices() {
          return this.audioDevices.length === 0;
        },
      },
      {},
      { deep: false }
    );
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

export default UserStore;
