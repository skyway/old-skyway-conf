import { EventEmitter } from "events";

export interface RoomInit {
  mode: RoomTypes;
  id: string;
}

export interface ClientInit {
  name: string;
  ua: string;
  hasGetDisplayMedia: boolean;
}

export interface UserDevices {
  videoInDevices: MediaDeviceInfo[] | null;
  audioInDevices: MediaDeviceInfo[] | null;
}

export type RoomData = RoomDataStat | RoomDataChat;
interface RoomDataStat {
  type: "stat";
  payload: RoomStat;
}
interface RoomDataChat {
  type: "chat";
  payload: {
    text: string;
  };
}

export interface RoomStat {
  displayName: string;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
}

export interface RoomChat {
  id: number;
  text: string;
  from: string;
  time: number;
  isMine: boolean;
}

export interface NotificationItem {
  id: number;
  type: "info" | "person" | "chat";
  text: string;
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
export interface RoomStream extends MediaStream {
  peerId: string;
}

type RoomTypes = "mesh" | "sfu";
interface RoomOptions {
  mode?: RoomTypes;
  stream?: MediaStream;
}

interface Room extends EventEmitter {
  id: string;
  send(payload: {}): void;
  replaceStream(stream: MediaStream): void;
  close(): void;

  on(ev: "stream", cb: (stream: RoomStream) => void): this;
  on(ev: "peerLeave", cb: (peerId: string) => void): this;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(ev: "data", cb: (data: { src: string; data: any }) => void): this;
  once(ev: "close", cb: () => void): this;
}

/* Types for hark */
export type Hark = (stream: MediaStream) => Harker;
interface Harker {
  stop(): void;
  on(ev: "speaking", cb: () => void): this;
  on(ev: "stopped_speaking", cb: () => void): this;
}

/* Types for global */
declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }
}
