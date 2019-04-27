import debug from "debug";
import RootStore from "../stores";
import {
  getUserDevices,
  getUserVideoTrack,
  getUserAudioTrack
} from "../utils//webrtc";
const log = debug("effect:settings");

export const enableVideo = ({ media, ui }: RootStore) => async () => {
  log("enableVideo()");

  const { videoInDevices } = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });

  // if not found just return
  if (videoInDevices.length === 0) {
    log("video devices are not found...");
    return;
  }

  // keep video track
  const [{ deviceId }] = videoInDevices;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(videoTrack);

  // and get valid labels...
  const devices = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });
  media.setDevices(devices);

  log("devices updated", { ...devices });
};

export const changeDeviceId = ({ media, ui }: RootStore) => async (
  kind: MediaStreamTrack["kind"],
  deviceId: string
) => {
  log("changeDeviceId", kind, deviceId);

  if (kind === "audio") {
    media.audioDeviceId = deviceId;
    const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setUserTrack(audioTrack);
  }

  if (kind === "video") {
    media.videoDeviceId = deviceId;
    const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setUserTrack(videoTrack);
  }
};

export const closeSettings = ({ ui }: RootStore) => async () => {
  log("closeSettings()");

  ui.isSettingsOpen = false;
};

export const joinConference = ({ ui, room }: RootStore) => async () => {
  log("joinConference()");

  // TODO: join skyway room

  room.isJoined = true;
  ui.isSettingsOpen = false;
};
