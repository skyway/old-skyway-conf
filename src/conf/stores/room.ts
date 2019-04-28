import { decorate, observable, computed, action } from "mobx";
import { RoomInit, Peer, SfuRoom, MeshRoom, RoomStream } from "../utils/types";

class RoomStore {
  peer: Peer | null;
  room: SfuRoom | MeshRoom | null;
  id: RoomInit["id"] | null;
  mode: RoomInit["mode"] | null;
  streams: Map<string, RoomStream>;

  constructor() {
    this.peer = null;
    this.room = null;
    this.id = null;
    this.mode = null;
    this.streams = new Map();
  }

  get name(): string {
    return `${this.mode}/${this.id}`;
  }

  get isJoined(): boolean {
    return this.room !== null;
  }

  load({ mode, id }: RoomInit, peer: Peer) {
    this.mode = mode;
    this.id = id;
    this.peer = peer;
  }

  addStream(stream: RoomStream) {
    this.streams.set(stream.peerId, stream);
  }

  removeStream(peerId: string) {
    this.streams.delete(peerId);
  }
}
decorate(RoomStore, {
  room: observable.ref,
  streams: observable.ref,
  isJoined: computed,
  load: action
});

export default RoomStore;
