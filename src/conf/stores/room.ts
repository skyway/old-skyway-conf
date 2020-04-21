import { decorate, observable, computed, action } from "mobx";
import { IObservableArray } from "mobx";
import Peer, { RoomStream, SfuRoom, MeshRoom } from "skyway-js";
import { RoomInit, RoomStat, RoomChat, RoomReaction } from "../utils/types";
import { getPeerConnectionFromSfuRoom } from "../utils/skyway";

class RoomStore {
  peer: Peer | null;
  isReady: boolean;
  room: SfuRoom | MeshRoom | null;
  mode: RoomInit["mode"] | null;
  id: RoomInit["id"] | null;
  useH264: RoomInit["useH264"];
  streams: Map<string, RoomStream>;
  stats: Map<string, RoomStat>;
  chats: IObservableArray<RoomChat>;
  myLastChat: RoomChat | null;
  myLastReaction: RoomReaction | null;
  pinnedId: string | null;
  castRequestCount: number;
  rtcStats: RTCStatsReport | null;

  constructor() {
    // Peer instance
    this.peer = null;
    this.isReady = false;
    // (Sfu|Mesh)Room instance
    this.room = null;
    // room name = mode + id
    this.mode = null;
    this.id = null;
    this.useH264 = false;

    this.streams = new Map();
    this.stats = new Map();
    // @ts-ignore: to type IObservableArray
    this.chats = [];
    this.myLastChat = null;
    this.myLastReaction = null;
    this.pinnedId = null;
    this.castRequestCount = 0;
    this.rtcStats = null;
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

  load({ mode, id, useH264 }: RoomInit, peer: Peer) {
    this.mode = mode;
    this.id = id;
    this.useH264 = useH264;
    this.peer = peer;
    this.isReady = true;
  }

  addLocalChat(from: string, text: string) {
    const chat = {
      id: Math.random(),
      time: Date.now(),
      isMine: true,
      from,
      text,
    };
    this.chats.push(chat);
    // this triggers reaction to send chat for remotes
    this.myLastChat = chat;
  }

  addRemoteChat(chat: RoomChat) {
    chat.isMine = false;
    this.chats.push(chat);
  }

  addReaction(from: string, reaction: string) {
    // this triggers reaction to send reaction for remotes
    this.myLastReaction = { from, reaction };
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

    return getPeerConnectionFromSfuRoom(this.room as SfuRoom);
  }

  cleanUp() {
    if (this.room === null) {
      throw new Error("Room is null!");
    }

    [...this.streams.values()].forEach((stream) =>
      stream.getTracks().forEach((track) => track.stop())
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
  isReady: observable,
  room: observable.ref,
  mode: observable,
  id: observable,
  streams: observable.shallow,
  stats: observable.shallow,
  chats: observable.shallow,
  myLastChat: observable.ref,
  myLastReaction: observable.ref,
  pinnedId: observable,
  castRequestCount: observable,
  rtcStats: observable.ref,
  name: computed,
  isJoined: computed,
  pinnedStream: computed,
  load: action,
  addLocalChat: action,
  addRemoteChat: action,
  removeStream: action,
  getPeerConnection: action,
  cleanUp: action,
});

export default RoomStore;
