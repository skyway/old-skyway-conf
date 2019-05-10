import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import { UserDevices, VideoType } from "../utils/types";

class MediaStore {
  audioInDevices: IObservableArray<MediaDeviceInfo>;
  videoInDevices: IObservableArray<MediaDeviceInfo>;
  audioDeviceId: string | null;
  videoDeviceId: string | null;
  isAudioTrackMuted: boolean;
  isVideoTrackMuted: boolean;
  videoType: VideoType;
  private audioTrack: MediaStreamTrack | null;
  private videoTrack: MediaStreamTrack | null;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.audioInDevices = [];
    // @ts-ignore: to type IObservableArray
    this.videoInDevices = [];
    this.audioDeviceId = null;
    this.videoDeviceId = null;
    this.isVideoTrackMuted = false;
    this.isAudioTrackMuted = true;
    this.videoType = null;
    this.audioTrack = null;
    this.videoTrack = null;
  }

  // TODO: maybe rename
  get isUserAudioEnabled(): boolean {
    return this.audioInDevices.length !== 0;
  }

  get isVideoEnabled(): boolean {
    return this.videoType !== null;
  }

  get stream(): MediaStream {
    const stream = new MediaStream();

    if (this.audioTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.audioTrack);
      this.audioTrack.enabled = !this.isAudioTrackMuted;
    }

    if (this.videoTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.videoTrack);
      this.videoTrack.enabled = !this.isVideoTrackMuted;
    }

    return stream;
  }

  get stat() {
    return {
      // TODO: rename
      isVideoDisabled: !this.isVideoEnabled,
      isAudioMuted: this.isAudioTrackMuted,
      isVideoMuted: this.isVideoTrackMuted
    };
  }

  setAudioTrack(track: MediaStreamTrack) {
    if (this.audioTrack instanceof MediaStreamTrack) {
      this.audioTrack.stop();
    }
    this.audioTrack = track;
  }

  setVideoTrack(track: MediaStreamTrack, type: VideoType) {
    if (this.videoTrack instanceof MediaStreamTrack) {
      this.videoTrack.stop();
    }
    this.videoTrack = track;
    this.videoType = type;
  }

  deleteVideoTrack() {
    if (this.videoTrack !== null) {
      this.videoTrack.stop();
      this.videoTrack = null;
      this.videoInDevices.clear();
      this.videoDeviceId = null;
      this.videoType = null;
    }
  }

  setDevices({ videoInDevices, audioInDevices }: UserDevices) {
    if (videoInDevices !== null) {
      this.videoInDevices.replace(videoInDevices);
    }
    if (audioInDevices !== null) {
      this.audioInDevices.replace(audioInDevices);
    }

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
  audioInDevices: observable.shallow,
  videoInDevices: observable.shallow,
  audioDeviceId: observable,
  videoDeviceId: observable,
  isAudioTrackMuted: observable,
  isVideoTrackMuted: observable,
  videoType: observable,
  audioTrack: observable.ref,
  videoTrack: observable.ref,
  stat: computed,
  isUserAudioEnabled: computed,
  isVideoEnabled: computed,
  stream: computed,
  setAudioTrack: action,
  setVideoTrack: action,
  deleteVideoTrack: action,
  setDevices: action,
  toggleMuted: action,
  setDefaultDeviceId: action
});

export default MediaStore;
