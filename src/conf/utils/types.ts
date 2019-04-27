import { EventEmitter } from "events";

export interface ClientInit {
  name: string;
  ua: string;
}

export interface UserDevices {
  videoInDevices: MediaDeviceInfo[];
  audioInDevices: MediaDeviceInfo[];
}

export interface Peer extends EventEmitter {
  id: string;

  joinRoom(name: string): void;

  on(ev: "open", cb: (id: string) => void): this;
  on(ev: "error", cb: (err: Error) => void): this;
  once(ev: "open", cb: (id: string) => void): this;
  once(ev: "error", cb: (err: Error) => void): this;
}
