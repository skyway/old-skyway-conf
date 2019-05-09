import { decorate, observable, computed, action } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../utils/types";

class ClientStore {
  browser: Parser.ParsedResult | null;
  hasGetDisplayMedia: boolean;

  isReady: boolean;
  displayName: string;

  constructor() {
    this.browser = null;
    this.hasGetDisplayMedia = false;

    this.isReady = false;
    this.displayName = "";
  }

  get stat() {
    return { displayName: this.displayName };
  }

  load({ name, ua, hasGetDisplayMedia }: ClientInit) {
    this.displayName = name;
    this.browser = parse(ua);
    this.hasGetDisplayMedia = hasGetDisplayMedia;

    this.isReady = true;
  }
}
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  isReady: observable,
  displayName: observable,
  stat: computed,
  load: action
});

export default ClientStore;
