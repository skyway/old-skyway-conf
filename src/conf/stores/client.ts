import { decorate, observable, action } from "mobx";
import { parse } from "bowser";
import { Parser } from "bowser";
import { ClientInit } from "../utils/types";

class ClientStore {
  isReady: boolean;
  dispayName: string;
  browser: Parser.ParsedResult | null;

  constructor() {
    this.isReady = false;
    this.dispayName = "";
    this.browser = null;
  }

  load({ name, ua }: ClientInit) {
    this.dispayName = name;
    this.browser = parse(ua);

    this.isReady = true;
  }
}
decorate(ClientStore, {
  // @ts-ignore: to use private accessor
  isReady: observable,
  dispayName: observable,
  browser: observable.ref,
  load: action
});

export default ClientStore;
