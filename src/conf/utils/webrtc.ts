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

export const getFakeVideoTrack = (): MediaStreamTrack => {
  const $canvas = document.createElement("canvas");
  $canvas.width = $canvas.height = 1;
  $canvas.getContext("2d");
  // @ts-ignore: captureStream() is not defined..
  const stream = $canvas.captureStream(0);
  const [vTrack] = stream.getVideoTracks();
  return vTrack;
};
