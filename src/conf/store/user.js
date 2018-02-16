import { extendObservable, observable, runInAction } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      env: observable.shallowObject({}),
      peerId: 'MY_PEER_ID',

      dispName: 'YOUR_NAME',
      isVideoMuted: false,
      isAudioMuted: false,

      videoDeviceId: '',
      audioDeviceId: '',
      videoDevices: observable.shallowArray([]),
      audioDevices: observable.shallowArray([]),

      get syncState() {
        return {
          peerId: this.peerId,
          dispName: this.dispName,
          isVideoMuted: this.isVideoMuted,
          isAudioMuted: this.isAudioMuted,
        };
      },
    });
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
    videoDevice || (this.videoDeviceId = this.videoDevices[0].deviceId);
    audioDevice || (this.audioDeviceId = this.audioDevices[0].deviceId);
  }
}

export default UserStore;
