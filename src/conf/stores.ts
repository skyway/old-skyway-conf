class UiStore {
  constructor() {}
}

class RootStore {
  ui: UiStore;

  constructor() {
    this.ui = new UiStore();
  }
}

export default RootStore;
