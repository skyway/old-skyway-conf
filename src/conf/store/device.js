import { extendObservable, observable } from 'mobx';

class DeviceStore {
  constructor() {
    extendObservable(this, {
      isVideoMuted: false,
      isAudioMuted: false,
      videoDeviceId: '',
      audioDeviceId: '',
      videoDevices: observable.shallowArray([]),
      audioDevices: observable.shallowArray([]),
    });
  }
}

export default DeviceStore;
