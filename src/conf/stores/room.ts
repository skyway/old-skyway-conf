import { decorate, observable, computed, action } from "mobx";
import { RoomInit, Peer, SfuRoom, MeshRoom, RoomStream } from "../utils/types";

class RoomStore {
  peer: Peer | null;
  room: SfuRoom | MeshRoom | null;
  mode: RoomInit["mode"] | null;
  id: RoomInit["id"] | null;
  streams: Map<string, RoomStream>;
  pinnedId: string | null;

  constructor() {
    // Peer instance
    this.peer = null;
    // (Sfu|Mesh)Room instance
    this.room = null;
    // room name = mode + id
    this.mode = null;
    this.id = null;

    this.streams = new Map();
    this.pinnedId = null;
  }

  get name(): string {
    return `${this.mode}/${this.id}`;
  }

  get isJoined(): boolean {
    return this.room !== null;
  }

  get pinnedStream(): RoomStream | null {
    if (this.pinnedId === null) {
      return null;
    }
    return this.streams.get(this.pinnedId) || null;
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

  cleanUp() {
    if (this.room === null) {
      throw new Error("Room is null!");
    }

    this.room.removeAllListeners();
    this.room.close();
    [...this.streams.values()].forEach(stream =>
      stream.getTracks().forEach(track => track.stop())
    );
    this.streams.clear();
  }
}
decorate(RoomStore, {
  streams: observable.shallow,
  pinnedId: observable,
  pinnedStream: computed,
  load: action,
  addStream: action,
  removeStream: action,
  cleanUp: action
});

export default RoomStore;
