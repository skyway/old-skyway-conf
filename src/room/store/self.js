import { extendObservable, observable } from 'mobx';

class SelfStore {
  constructor() {
    extendObservable(this, {
      stream: observable.shallowObject({}),
      isVideoMuted: false,
      isAudioMuted: false,
      videoDeviceId: '',
      audioDeviceId: '',
      videoDevices: observable.shallowArray([]),
      audioDevices: observable.shallowArray([]),
    });
  }
}

export default SelfStore;
