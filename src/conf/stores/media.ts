import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import { UserDevices } from "../utils/types";
import { getFakeVideoTrack } from "../utils/webrtc";

class MediaStore {
  videoInDevices: IObservableArray<MediaDeviceInfo>;
  audioInDevices: IObservableArray<MediaDeviceInfo>;
  audioDeviceId: string | null;
  videoDeviceId: string | null;
  audioTrack: MediaStreamTrack | null;
  videoTrack: MediaStreamTrack;
  isUserVideoEnabled: boolean;
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
    this.videoTrack = getFakeVideoTrack();
    this.isUserVideoEnabled = false;
    this.isVideoTrackMuted = false;
    this.isAudioTrackMuted = true;
  }

  get isReady(): boolean {
    return this.audioTrack !== null;
  }

  get stream(): MediaStream {
    const stream = new MediaStream([this.videoTrack]);

    if (this.audioTrack instanceof MediaStreamTrack) {
      stream.addTrack(this.audioTrack);
    }

    // apply muted state
    this.videoTrack && (this.videoTrack.enabled = !this.isVideoTrackMuted);
    this.audioTrack && (this.audioTrack.enabled = !this.isAudioTrackMuted);

    return stream;
  }

  setUserTrack(track: MediaStreamTrack) {
    if (track.kind === "video") {
      if (this.videoTrack instanceof MediaStreamTrack) {
        this.videoTrack.stop();
      }
      this.videoTrack = track;

      // set video track means user enables video
      this.isUserVideoEnabled = true;
    }
    if (track.kind === "audio") {
      if (this.audioTrack instanceof MediaStreamTrack) {
        this.audioTrack.stop();
      }
      this.audioTrack = track;
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
  isUserVideoEnabled: observable,
  isReady: computed,
  stream: computed,
  setUserTrack: action,
  setDevices: action,
  toggleMuted: action,
  setDefaultDeviceId: action
});

export default MediaStore;
