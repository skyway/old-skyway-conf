import { decorate, observable, action } from "mobx";
import debug from "debug";

const log = debug("store:ui");

class UiStore {
  error: Error | null;
  isSettingsOpen: boolean;

  constructor() {
    this.error = null;
    this.isSettingsOpen = true;
  }

  showError(err: Error) {
    log("error", err);
    this.error = err;
  }
}
decorate(UiStore, {
  error: observable.ref,
  isSettingsOpen: observable,
  showError: action
});

export default UiStore;
