import UiStore from "./ui";
import ClientStore from "./client";
import MediaStore from "./media";
import RoomStore from "./room";
import NotificationStore from "./notification";

class RootStore {
  ui: UiStore;
  client: ClientStore;
  media: MediaStore;
  room: RoomStore;
  notification: NotificationStore;

  constructor() {
    this.ui = new UiStore();
    this.client = new ClientStore();
    this.media = new MediaStore();
    this.room = new RoomStore();
    this.notification = new NotificationStore();
  }
}

export default RootStore;
