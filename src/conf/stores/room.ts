import { decorate, observable, computed, action } from "mobx";
import { RoomInit } from "../utils/types";

class RoomStore {
  isJoined: boolean;
  id: RoomInit["id"] | null;
  mode: RoomInit["mode"] | null;

  constructor() {
    this.isJoined = false;
    this.id = null;
    this.mode = null;
  }

  get name(): string {
    return `${this.mode}/${this.id}`;
  }

  load({ mode, id }: RoomInit) {
    this.mode = mode;
    this.id = id;
  }
}
decorate(RoomStore, {
  isJoined: observable,
  name: computed,
  load: action
});

export default RoomStore;
