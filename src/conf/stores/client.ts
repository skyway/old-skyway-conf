import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../types";

class ClientStore {
  isReady: boolean;
  dispayName: string;
  browser: Parser.ParsedResult | null;
  private devices: IObservableArray<MediaDeviceInfo>;

  constructor() {
    this.isReady = false;
    this.dispayName = "";
    this.browser = null;
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

    this.isReady = true;
  }
}
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  isReady: observable,
  dispayName: observable,
  browser: observable.ref,
  devices: observable.shallow,
  audioInDevices: computed,
  videoInDevices: computed,
  load: action
});

export default ClientStore;
