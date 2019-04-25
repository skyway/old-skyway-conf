export interface ClientInit {
  name: string;
  ua: string;
}

export interface UserDevices {
  videoInDevices: MediaDeviceInfo[];
  audioInDevices: MediaDeviceInfo[];
}
