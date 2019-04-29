import { decorate, observable, action } from "mobx";

class UiStore {
  error: Error | null;
  isSettingsOpen: boolean;

  constructor() {
    this.error = null;
    // TODO: debug
    // this.isSettingsOpen = true;
    this.isSettingsOpen = false;
  }

  showError(err: Error): Error {
    this.error = err;
    return err;
  }
}
decorate(UiStore, {
  error: observable.ref,
  isSettingsOpen: observable,
  showError: action
});

export default UiStore;
