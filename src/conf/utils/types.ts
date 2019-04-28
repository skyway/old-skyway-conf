import { EventEmitter } from "events";

export interface RoomInit {
  mode: RoomTypes;
  id: string;
}

export interface ClientInit {
  name: string;
  ua: string;
}

export interface UserDevices {
  videoInDevices: MediaDeviceInfo[];
  audioInDevices: MediaDeviceInfo[];
}

/* Types for skyway-js */
export interface Peer extends EventEmitter {
  id: string;

  joinRoom<T>(name: string, options?: RoomOptions): T;

  on(ev: "error", cb: (err: Error) => void): this;
  once(ev: "open", cb: (id: string) => void): this;
  once(ev: "error", cb: (err: Error) => void): this;
}
export type SfuRoom = Room;
export type MeshRoom = Room;

type RoomTypes = "mesh" | "sfu";
interface RoomOptions {
  mode?: RoomTypes;
  stream?: MediaStream;
}

interface Room extends EventEmitter {
  id: string;
  send(payload: {}): void;
  replaceStream(stream: MediaStream): void;

  on(ev: "stream", cb: (stream: MediaStream) => void): this;
  on(ev: "peerLeave", cb: (peerId: string) => void): this;
  on(ev: "data", cb: (data: {}) => void): this;
  on(ev: "close", cb: () => void): this;
}
