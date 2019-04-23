import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";

class MediaStore {
  audioDeviceId: string;
  videoDeviceId: string;
  audioTrack: MediaStreamTrack | null;
  videoTrack: MediaStreamTrack | null;
  private devices: IObservableArray<MediaDeviceInfo>;

  constructor() {
    this.audioDeviceId = "default";
    this.videoDeviceId = "default";
    this.audioTrack = null;
    this.videoTrack = null;
    // @ts-ignore: to be detected as IObservableArray
    this.devices = [];
  }

  get audioInDevices(): MediaDeviceInfo[] {
    return this.devices.filter(
      device => device.kind === "audioinput" && device.deviceId !== "default"
    );
  }

  get videoInDevices(): MediaDeviceInfo[] {
    return this.devices.filter(
      device => device.kind === "videoinput" && device.deviceId !== "default"
    );
  }

  get stream(): MediaStream {
    const stream = new MediaStream();
    try {
      if (this.audioTrack instanceof MediaStreamTrack) {
        stream.addTrack(this.audioTrack);
      }
      if (this.videoTrack instanceof MediaStreamTrack) {
        stream.addTrack(this.videoTrack);
      }
    } catch (err) {
      debugger;
    }
    return stream;
  }

  setTrack(stream: MediaStream) {
    const [vTrack] = stream.getVideoTracks();
    const [aTrack] = stream.getAudioTracks();

    this.videoTrack = vTrack || null;
    this.audioTrack = aTrack || null;
  }

  updateDevices(devices: MediaDeviceInfo[]) {
    this.devices.replace(devices);
    this.setDefaultDeviceIfNeeded();
  }

  private setDefaultDeviceIfNeeded() {
    const curAudioDevice = this.audioInDevices.find(
      device => device.deviceId === this.audioDeviceId
    );
    const curVideoDevice = this.videoInDevices.find(
      device => device.deviceId === this.videoDeviceId
    );

    // if not found, set first device as default
    if (!curAudioDevice) {
      this.audioDeviceId = this.audioInDevices[0].deviceId;
    }
    if (!curVideoDevice) {
      this.videoDeviceId = this.videoInDevices[0].deviceId;
    }
  }
}
decorate(MediaStore, {
  // @ts-ignore: to use private accessor
  audioDeviceId: observable,
  videoDeviceId: observable,
  audioTrack: observable.ref,
  videoTrack: observable.ref,
  devices: observable.shallow,
  stream: computed,
  audioInDevices: computed,
  videoInDevices: computed,
  updateDevices: action,
  setTrack: action,
  setDefaultDeviceIfNeeded: action
});

export default MediaStore;
