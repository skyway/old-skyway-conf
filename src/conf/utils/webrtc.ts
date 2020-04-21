import { UserDevices } from "./types";

export const getUserDevices = async (
  options: MediaStreamConstraints
): Promise<UserDevices> => {
  const devices = (await navigator.mediaDevices.enumerateDevices()) || [];

  const videoInDevices = [];
  const audioInDevices = [];

  for (const device of devices) {
    if (device.kind === "videoinput") {
      videoInDevices.push(device);
    }
    if (device.kind === "audioinput") {
      audioInDevices.push(device);
    }
  }

  const ret: UserDevices = {
    videoInDevices: null,
    audioInDevices: null,
  };

  if (options.video) {
    ret.videoInDevices = videoInDevices;
  }
  if (options.audio) {
    ret.audioInDevices = audioInDevices;
  }

  return ret;
};

export const getUserAudioTrack = async (
  deviceId: string
): Promise<MediaStreamTrack> => {
  const constraints =
    deviceId === "" ? true : { deviceId: { exact: deviceId } };

  return navigator.mediaDevices
    .getUserMedia({ audio: constraints })
    .then((stream) => stream.getAudioTracks()[0]);
};

export const getUserVideoTrack = async (
  deviceId: string
): Promise<MediaStreamTrack> => {
  const constraints =
    deviceId === "" ? true : { deviceId: { exact: deviceId } };

  return navigator.mediaDevices
    .getUserMedia({ video: constraints })
    .then((stream) => stream.getVideoTracks()[0]);
};

export const getDisplayVideoTrack = async (): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => stream.getVideoTracks()[0]);
};
