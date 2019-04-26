import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import { UserDevices } from "../utils/types";

class MediaStore {
  videoInDevices: IObservableArray<MediaDeviceInfo>;
  audioInDevices: IObservableArray<MediaDeviceInfo>;
  audioDeviceId: string | null;
  videoDeviceId: string | null;
  audioTrack: MediaStreamTrack | null;
  videoTrack: MediaStreamTrack | null;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.videoInDevices = [];
    // @ts-ignore: to type IObservableArray
    this.audioInDevices = [];
    this.audioDeviceId = null;
    this.videoDeviceId = null;
    this.audioTrack = null;
    this.videoTrack = null;
  }

  get isReady(): boolean {
    return this.audioTrack !== null;
  }

  get isUserVideoEnabled(): boolean {
    if (this.videoTrack !== null) {
      return true;
    }
    return false;
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

  setUserTrack(track: MediaStreamTrack) {
    if (track.kind === "video") {
      this.videoTrack = track;
    }
    if (track.kind === "audio") {
      this.audioTrack = track;
    }
  }

  setDevices({ videoInDevices, audioInDevices }: UserDevices) {
    this.videoInDevices.replace(videoInDevices);
    this.audioInDevices.replace(audioInDevices);

    this.setDefaultDeviceId();
  }

  private setDefaultDeviceId() {
    if (this.audioDeviceId === null) {
      const [defaultAudioDevice] = this.audioInDevices;
      // may be undefined
      if (defaultAudioDevice instanceof MediaDeviceInfo) {
        this.audioDeviceId = defaultAudioDevice.deviceId;
      }
    }

    if (this.videoDeviceId === null) {
      const [defaultVideoDevice] = this.videoInDevices;
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
  isReady: computed,
  isUserVideoEnabled: computed,
  stream: computed,
  setUserTrack: action,
  setDevices: action,
  setDefaultDeviceId: action
});

export default MediaStore;
