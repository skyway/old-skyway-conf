import { extendObservable, observable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      peerId: '',
      dispName: 'YOUR NAME',
      isVideoMuted: false,
      isAudioMuted: false,
      videoDeviceId: '',
      audioDeviceId: '',
      videoDevices: observable.shallowArray([]),
      audioDevices: observable.shallowArray([]),
    });
  }
}

export default UserStore;
