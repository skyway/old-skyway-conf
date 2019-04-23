import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../types";

class ClientStore {
  isReady: boolean;
  dispayName: string;
  browser: Parser.ParsedResult | null;
  audioDeviceId: string;
  videoDeviceId: string;
  private devices: IObservableArray<MediaDeviceInfo>;

  constructor() {
    this.isReady = false;
    this.dispayName = "";
    this.browser = null;
    this.audioDeviceId = "default";
    this.videoDeviceId = "default";
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

  load({ name, ua, devices }: ClientInit) {
    this.dispayName = name;
    this.browser = parse(ua);
    this.devices.replace(devices);

    this.setDefaultDeviceIfNeeded();

    this.isReady = true;
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
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  isReady: observable,
  dispayName: observable,
  browser: observable.ref,
  audioDeviceId: observable,
  videoDeviceId: observable,
  devices: observable.shallow,
  audioInDevices: computed,
  videoInDevices: computed,
  load: action,
  updateDevices: action,
  setDefaultDeviceIfNeeded: action
});

export default ClientStore;
