import UiStore from "./ui";

class RootStore {
  ui: UiStore;

  constructor() {
    this.ui = new UiStore();
  }
}

export default RootStore;
