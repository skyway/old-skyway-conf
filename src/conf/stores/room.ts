import { decorate, observable } from "mobx";

class RoomStore {
  isJoined: boolean;
  name: string | null;

  constructor() {
    this.isJoined = false;
    this.name = null;
  }
}
decorate(RoomStore, {
  isJoined: observable
});

export default RoomStore;
