import { decorate, observable, computed, action } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit, ClientBrowser } from "../utils/types";

class ClientStore {
  hasGetDisplayMedia: boolean;
  hasUserVideoDevice: boolean;
  isReady: boolean;
  displayName: string;
  private parsedBrowser: Parser.ParsedResult | null;

  constructor() {
    this.hasGetDisplayMedia = false;
    this.hasUserVideoDevice = false;
    this.isReady = false;
    this.displayName = "YOUR_NAME";
    this.parsedBrowser = null;
  }

  get isDisplayNameValid(): boolean {
    if (this.displayName.trim() === "") return false;
    return true;
  }

  get stat() {
    return {
      displayName: this.displayName,
      browser: this.browser,
    };
  }

  get browser(): ClientBrowser {
    const { parsedBrowser } = this;
    if (parsedBrowser === null) {
      return {
        name: "N/A",
        version: "0.0.0",
      };
    }

    return {
      name: parsedBrowser.browser.name || "unknown",
      version: parsedBrowser.browser.version || "0.0.0",
    };
  }

  load({ name, ua, hasGetDisplayMedia, hasUserVideoDevice }: ClientInit) {
    this.hasGetDisplayMedia = hasGetDisplayMedia;
    this.hasUserVideoDevice = hasUserVideoDevice;
    this.isReady = true;
    if (name.length !== 0) this.displayName = name;
    this.parsedBrowser = parse(ua);
  }
}
// @ts-ignore: to use private accessor
decorate(ClientStore, {
  hasGetDisplayMedia: observable,
  hasUserVideoDevice: observable,
  isReady: observable,
  displayName: observable,
  parsedBrowser: observable.ref,
  isDisplayNameValid: computed,
  stat: computed,
  browser: computed,
  load: action,
});

export default ClientStore;
