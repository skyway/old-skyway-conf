import { decorate, observable } from "mobx";

class RoomStore {
  isJoined: boolean;

  constructor() {
    this.isJoined = false;
  }
}
decorate(RoomStore, {
  isJoined: observable
});

export default RoomStore;
