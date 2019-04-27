import UiStore from "./ui";
import ClientStore from "./client";
import MediaStore from "./media";
import RoomStore from "./room";

// TODO: should be function returns object..?
class RootStore {
  ui: UiStore;
  client: ClientStore;
  media: MediaStore;
  room: RoomStore;

  constructor() {
    this.ui = new UiStore();
    this.client = new ClientStore();
    this.media = new MediaStore();
    this.room = new RoomStore();
  }
}

export default RootStore;
