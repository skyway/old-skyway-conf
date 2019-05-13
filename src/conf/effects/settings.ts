import debug from "debug";
import RootStore from "../stores";
import {
  getUserDevices,
  getUserVideoTrack,
  getUserAudioTrack,
  getDisplayVideoTrack
} from "../utils/webrtc";
import { joinRoom } from "./room";

const log = debug("effect:settings");

export const changeDispName = ({ client }: RootStore) => (name: string) => {
  log("changeDispName()", `${client.displayName} => ${name}`);
  client.displayName = name;
};

export const enableUserVideo = ({ media, ui }: RootStore) => async () => {
  log("enableUserVideo()");

  const { videoInDevices } = await getUserDevices({ video: true }).catch(
    err => {
      throw ui.showError(err);
    }
  );

  // must not be happened
  if (videoInDevices === null) {
    throw ui.showError(new Error("getUserDevices() returns null"));
  }
  // must not be happened
  if (videoInDevices.length === 0) {
    throw ui.showError(new Error("At leaset one video input device needed!"));
  }

  // keep video track
  const [{ deviceId }] = videoInDevices;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  // may trigger replaceStream()
  media.setVideoTrack(videoTrack, "camera");

  // and get valid labels...
  const devices = await getUserDevices({ video: true }).catch(err => {
    throw ui.showError(err);
  });
  media.setDevices(devices);

  log("video devices", devices.videoInDevices);
};

export const enableDisplayVideo = (store: RootStore) => async () => {
  log("enableDisplayVideo()");
  const { media, ui, notification } = store;

  const videoTrack = await getDisplayVideoTrack().catch(err => {
    if (err.name === "NotAllowedError") {
      // cancelled
    } else {
      throw ui.showError(err);
    }
  });

  if (!(videoTrack instanceof MediaStreamTrack)) {
    notification.showInfo("Display selection was cancelled");
    log("selection was cancelled");
    return;
  }

  videoTrack.addEventListener("ended", disableDisplayVideo(store), {
    once: true
  });

  // videoType changed display -> display
  if (media.videoType === "display") {
    notification.showInfo("Display was changed");
  }
  // may trigger replaceStream()
  media.setVideoTrack(videoTrack, "display");
};

export const disableUserVideo = ({ media }: RootStore) => () => {
  log("disableUserVideo()");
  media.deleteVideoTrack();
};

export const disableDisplayVideo = ({ media }: RootStore) => () => {
  log("disableDisplayVideo()");
  media.deleteVideoTrack();
};

export const changeAudioDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeAudioDeviceId", deviceId);

  media.audioDeviceId = deviceId;
  const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setAudioTrack(audioTrack);
};
export const changeVideoDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeVideoDeviceId", deviceId);

  media.videoDeviceId = deviceId;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setAudioTrack(videoTrack);
};

export const toggleAudioMuted = ({ media }: RootStore) => () => {
  log("toggleAudioMuted()");
  media.toggleMuted("audio");
};

export const toggleVideoMuted = ({ media }: RootStore) => () => {
  log("toggleVideoMuted()");
  media.toggleMuted("video");
};

export const closeSettings = ({ ui }: RootStore) => () => {
  log("closeSettings()");
  ui.isSettingsOpen = false;
};

export const joinConference = (store: RootStore) => () => {
  log("joinConference()");
  const { ui, room } = store;

  // must not be happened
  if (room.isJoined) {
    throw ui.showError(new Error("Already in the room!"));
  }

  joinRoom(store);
  ui.isSettingsOpen = false;
};
