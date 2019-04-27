import { decorate, observable } from "mobx";

class RoomStore {
  isJoined: boolean;
  roomName: string | null;

  constructor() {
    this.isJoined = false;
    this.roomName = null;
  }
}
decorate(RoomStore, {
  isJoined: observable
});

export default RoomStore;
