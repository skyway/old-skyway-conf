import { decorate, observable } from "mobx";

class UiStore {
  isSettingsOpen: boolean;

  constructor() {
    this.isSettingsOpen = true;
  }
}
decorate(UiStore, {
  isSettingsOpen: observable
});

export default UiStore;
