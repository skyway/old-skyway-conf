import { decorate, observable, action } from "mobx";

class UiStore {
  error: Error | null;
  isSettingsOpen: boolean;
  isChatOpen: boolean;
  isReactionOpen: boolean;
  isStatsOpen: boolean;
  isReEntering: boolean;

  constructor() {
    this.error = null;
    this.isSettingsOpen = true;
    this.isChatOpen = false;
    this.isReactionOpen = false;
    this.isStatsOpen = false;
    this.isReEntering = false;
  }

  showError(err: Error): Error {
    this.error = err;
    return err;
  }
}
decorate(UiStore, {
  error: observable.ref,
  isSettingsOpen: observable,
  isChatOpen: observable,
  isReactionOpen: observable,
  isStatsOpen: observable,
  isReEntering: observable,
  showError: action,
});

export default UiStore;
