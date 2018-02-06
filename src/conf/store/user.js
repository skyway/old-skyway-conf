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
}

export default UserStore;
