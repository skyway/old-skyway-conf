import UiStore from "./ui";
import ClientStore from "./client";
import MediaStore from "./media";

// TODO: should be function returns object..?
class RootStore {
  ui: UiStore;
  client: ClientStore;
  media: MediaStore;

  constructor() {
    this.ui = new UiStore();
    this.client = new ClientStore();
    this.media = new MediaStore();
  }
}

export default RootStore;
