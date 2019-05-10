import { decorate, observable, computed, action } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../utils/types";

class ClientStore {
  browser: Parser.ParsedResult | null;
  hasGetDisplayMedia: boolean;
  hasUserVideoDevice: boolean;
  isReady: boolean;
  displayName: string;

  constructor() {
    this.browser = null;
    this.hasGetDisplayMedia = false;
    this.hasUserVideoDevice = false;
    this.isReady = false;
    this.displayName = "";
  }

  get stat() {
    return { displayName: this.displayName };
  }

  load({ name, ua, hasGetDisplayMedia, hasUserVideoDevice }: ClientInit) {
    this.browser = parse(ua);
    this.hasGetDisplayMedia = hasGetDisplayMedia;
    this.hasUserVideoDevice = hasUserVideoDevice;
    this.isReady = true;
    this.displayName = name;
  }
}
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  browser: observable.ref,
  hasGetDisplayMedia: observable,
  hasUserVideoDevice: observable,
  isReady: observable,
  displayName: observable,
  stat: computed,
  load: action
});

export default ClientStore;
