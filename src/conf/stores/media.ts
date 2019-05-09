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
  isAudioTrackMuted: boolean;
  isVideoTrackMuted: boolean;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.videoInDevices = [];
    // @ts-ignore: to type IObservableArray
    this.audioInDevices = [];
    this.audioDeviceId = null;
    this.videoDeviceId = null;
    this.audioTrack = null;
    this.videoTrack = null;
    this.isVideoTrackMuted = false;
    this.isAudioTrackMuted = true;
  }

  get isUserAudioEnabled(): boolean {
    return this.audioTrack !== null;
  }

  get isUserVideoEnabled(): boolean {
    return this.videoTrack !== null;
  }

  get stream(): MediaStream {
    const stream = new MediaStream();

    if (this.audioTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.audioTrack);
    }
    if (this.videoTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.videoTrack);
    }

    // apply muted state
    this.videoTrack && (this.videoTrack.enabled = !this.isVideoTrackMuted);
    this.audioTrack && (this.audioTrack.enabled = !this.isAudioTrackMuted);

    return stream;
  }

  get stat() {
    return {
      isVideoDisabled: !this.isUserVideoEnabled,
      isAudioMuted: this.isAudioTrackMuted,
      isVideoMuted: this.isVideoTrackMuted
    };
  }

  setUserTrack(track: MediaStreamTrack) {
    if (track.kind === "video") {
      if (this.videoTrack instanceof MediaStreamTrack) {
        this.videoTrack.stop();
      }
      this.videoTrack = track;
    }
    if (track.kind === "audio") {
      if (this.audioTrack instanceof MediaStreamTrack) {
        this.audioTrack.stop();
      }
      this.audioTrack = track;
    }
  }

  deleteUserTrack(kind: "video") {
    if (kind === "video" && this.videoTrack !== null) {
      this.videoTrack.stop();
      this.videoTrack = null;
    }
  }

  setDevices({ videoInDevices, audioInDevices }: UserDevices) {
    this.videoInDevices.replace(videoInDevices);
    this.audioInDevices.replace(audioInDevices);

    this.setDefaultDeviceId();
  }

  toggleMuted(kind: MediaStreamTrack["kind"]) {
    if (kind === "video") {
      this.isVideoTrackMuted = !this.isVideoTrackMuted;
    }
    if (kind === "audio") {
      this.isAudioTrackMuted = !this.isAudioTrackMuted;
    }
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
  isAudioTrackMuted: observable,
  isVideoTrackMuted: observable,
  stat: computed,
  isUserAudioEnabled: computed,
  isUserVideoEnabled: computed,
  stream: computed,
  setUserTrack: action,
  deleteUserTrack: action,
  setDevices: action,
  toggleMuted: action,
  setDefaultDeviceId: action
});

export default MediaStore;
