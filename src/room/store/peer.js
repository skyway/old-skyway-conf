import { extendObservable, observable } from 'mobx';

class PeerStore {
  constructor() {
    extendObservable(this, {
      stream: observable.shallowObject({}),
      isVideoMuted: false,
      isAudioMuted: false,
      videoDeviceId: '',
      audioDeviceId: '',
      get videoDevices() {
        return this._devices.filter(i => i.kind === 'videoinput');
      },
      get audioDevices() {
        return this._devices.filter(i => i.kind === 'audioinput');
      },
      _devices: observable.shallowArray([]),
    });
  }

  updateUserDevices(devices) {
    this._devices.replace(devices);
  }
}

export default PeerStore;
