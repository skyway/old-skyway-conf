export interface RoomInit {
  mode: "sfu" | "mesh";
  id: string;
}

export interface ClientInit {
  name: string;
  ua: string;
  hasGetDisplayMedia: boolean;
  hasUserVideoDevice: boolean;
}

export interface ClientBrowser {
  name: string;
  version: string;
}

export interface UserDevices {
  videoInDevices: MediaDeviceInfo[] | null;
  audioInDevices: MediaDeviceInfo[] | null;
}

export type VideoType = "camera" | "display" | null;

export type RoomData = RoomDataStat | RoomDataChat | RoomDataCast;
interface RoomDataStat {
  type: "stat";
  payload: RoomStat;
}
interface RoomDataChat {
  type: "chat";
  payload: RoomChat;
}
interface RoomDataCast {
  type: "cast";
  payload: RoomCast;
}

export interface RoomStat {
  displayName: string;
  browser: ClientBrowser;
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

export interface RoomCast {
  from: string;
}

export type NotificationType = "info" | "person" | "chat";
export interface NotificationItem {
  id: number;
  type: NotificationType;
  text: string;
}

export interface StatsReport {
  key: string;
  value: object;
  index: string;
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
