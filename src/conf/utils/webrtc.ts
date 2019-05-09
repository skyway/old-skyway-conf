import { UserDevices } from "./types";

export const getUserDevices = async (): Promise<UserDevices> => {
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

  return { videoInDevices, audioInDevices };
};

export const getUserAudioTrack = async (
  deviceId: string
): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getUserMedia({
      audio: { deviceId: { exact: deviceId } }
    })
    .then(stream => stream.getAudioTracks()[0]);
};

export const getUserVideoTrack = async (
  deviceId: string
): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getUserMedia({
      video: { deviceId: { exact: deviceId } }
    })
    .then(stream => stream.getVideoTracks()[0]);
};

export const getScreenVideoTrack = async (): Promise<MediaStreamTrack> => {
  return navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then(stream => stream.getVideoTracks()[0]);
};
