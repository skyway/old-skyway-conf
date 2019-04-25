import { decorate, observable, computed, action } from "mobx";
import { UserDevices } from "../utils/types";

class MediaStore {
  videoInDevices: UserDevices["videoInDevices"];
  audioInDevices: UserDevices["audioInDevices"];
  audioDeviceId: string | null;
  videoDeviceId: string | null;
  audioTrack: MediaStreamTrack | null;
  videoTrack: MediaStreamTrack | null;

  constructor() {
    this.videoInDevices = [];
    this.audioInDevices = [];
    this.audioDeviceId = null;
    this.videoDeviceId = null;
    this.audioTrack = null;
    this.videoTrack = null;
  }

  get stream(): MediaStream {
    const stream = new MediaStream();

    if (this.audioTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.audioTrack);
    }
    if (this.videoTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.videoTrack);
    }

    return stream;
  }

  updateDevices({ videoInDevices, audioInDevices }: UserDevices) {
    this.videoInDevices = videoInDevices;
    this.audioInDevices = audioInDevices;

    // set default deviceId
    if (this.audioDeviceId === null) {
      const [defaultAudioDevice] = audioInDevices;
      // may be undefined
      if (defaultAudioDevice instanceof MediaDeviceInfo) {
        this.audioDeviceId = defaultAudioDevice.deviceId;
      }
    }
    if (this.videoDeviceId === null) {
      const [defaultVideoDevice] = videoInDevices;
      // may be undefined
      if (defaultVideoDevice instanceof MediaDeviceInfo) {
        this.videoDeviceId = defaultVideoDevice.deviceId;
      }
    }
  }
}
decorate(MediaStore, {
  // @ts-ignore: to use private accessor
  audioDeviceId: observable,
  videoDeviceId: observable,
  audioTrack: observable.ref,
  videoTrack: observable.ref,
  audioInDevices: observable.shallow,
  videoInDevices: observable.shallow,
  stream: computed,
  updateDevices: action
});

export default MediaStore;
