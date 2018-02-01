import { extendObservable, observable } from 'mobx';

class PeerStore {
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

export default PeerStore;
