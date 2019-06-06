import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import {
  RoomInit,
  Peer,
  SfuRoom,
  MeshRoom,
  RoomStream,
  RoomStat,
  RoomChat,
  StatsReport
} from "../utils/types";

class RoomStore {
  peer: Peer | null;
  room: SfuRoom | MeshRoom | null;
  mode: RoomInit["mode"] | null;
  id: RoomInit["id"] | null;
  streams: Map<string, RoomStream>;
  stats: Map<string, RoomStat>;
  chats: IObservableArray<RoomChat>;
  myLastChat: RoomChat | null;
  pinnedId: string | null;
  castRequestCount: number;
  confStats: IObservableArray<StatsReport>;

  constructor() {
    // Peer instance
    this.peer = null;
    // (Sfu|Mesh)Room instance
    this.room = null;
    // room name = mode + id
    this.mode = null;
    this.id = null;

    this.streams = new Map();
    this.stats = new Map();
    // @ts-ignore: to type IObservableArray
    this.chats = [];
    this.myLastChat = null;
    this.pinnedId = null;
    this.castRequestCount = 0;
    // @ts-ignore: to type IObservableArray
    this.confStats = [];
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

  addLocalChat(from: string, text: string) {
    const chat = {
      id: Math.random(),
      time: Date.now(),
      isMine: true,
      from,
      text
    };
    this.chats.push(chat);
    // this triggers reaction to send chat for remotes
    this.myLastChat = chat;
  }

  addRemoteChat(chat: RoomChat) {
    chat.isMine = false;
    this.chats.push(chat);
  }

  removeStream(peerId: string) {
    this.streams.delete(peerId);
    this.stats.delete(peerId);
    if (this.pinnedId === peerId) {
      this.pinnedId = null;
    }
  }

  getPeerConnection(): RTCPeerConnection | null {
    if (this.mode !== "sfu") {
      return null;
    }
    if (this.room === null) {
      return null;
    }

    // @ts-ignore: to get private refs
    const pc: RTCPeerConnection = this.room._negotiator._pc;
    return pc;
  }

  cleanUp() {
    if (this.room === null) {
      throw new Error("Room is null!");
    }

    [...this.streams.values()].forEach(stream =>
      stream.getTracks().forEach(track => track.stop())
    );
    this.streams.clear();
    this.stats.clear();
    this.chats.length = 0;
    this.myLastChat = null;
    this.room = null;
  }
}
decorate(RoomStore, {
  peer: observable.ref,
  room: observable.ref,
  mode: observable,
  id: observable,
  streams: observable.shallow,
  stats: observable.shallow,
  chats: observable.shallow,
  myLastChat: observable.ref,
  pinnedId: observable,
  castRequestCount: observable,
  confStats: observable.shallow,
  name: computed,
  isJoined: computed,
  pinnedStream: computed,
  load: action,
  addLocalChat: action,
  addRemoteChat: action,
  removeStream: action,
  getPeerConnection: action,
  cleanUp: action
});

export default RoomStore;
