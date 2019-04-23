import { decorate, observable } from "mobx";

class UiStore {
  error: Error | null;

  constructor() {
    this.error = null;
  }

  showError(err: Error) {
    this.error = err;
  }
}
decorate(UiStore, {
  error: observable
});

class RootStore {
  ui: UiStore;

  constructor() {
    this.ui = new UiStore();
  }
}

export default RootStore;
