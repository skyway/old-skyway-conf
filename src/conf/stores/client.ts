import { decorate, observable, computed, action } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../utils/types";

class ClientStore {
  isReady: boolean;
  displayName: string;
  browser: Parser.ParsedResult | null;

  constructor() {
    this.isReady = false;
    this.displayName = "";
    this.browser = null;
  }

  get browserName(): string {
    if (this.browser === null) {
      return "N/A";
    }

    return `${this.browser.browser.name} v${this.browser.browser.version}`;
  }

  get stat() {
    return { displayName: this.displayName, browser: this.browser };
  }

  load({ name, ua }: ClientInit) {
    this.displayName = name;
    this.browser = parse(ua);

    this.isReady = true;
  }
}
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  isReady: observable,
  displayName: observable,
  browser: observable.ref,
  browserName: computed,
  stat: computed,
  load: action
});

export default ClientStore;
