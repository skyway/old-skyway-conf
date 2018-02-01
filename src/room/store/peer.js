import { extendObservable, observable } from 'mobx';

class PeerStore {
  constructor() {
    extendObservable(this, {
      stream: observable.shallowObject({}),
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

  set(key, val) {
    if (key in this === false) {
      throw new Error(`${key} is not defined!`);
    }
    this[key] = val;
  }

  updateUserDevices(devices) {
    this._devices.replace(devices);
  }
}

export default PeerStore;
