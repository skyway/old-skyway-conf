import UiStore from "./ui";
import ClientStore from "./client";

class RootStore {
  ui: UiStore;
  client: ClientStore;

  constructor() {
    this.ui = new UiStore();
    this.client = new ClientStore();
  }
}

export default RootStore;
