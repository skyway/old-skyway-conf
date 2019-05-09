import debug from "debug";
import RootStore from "../stores";
import {
  getUserDevices,
  getUserVideoTrack,
  getUserAudioTrack
} from "../utils/webrtc";
import { joinRoom, setSkipReplaceStream } from "./room";

const log = debug("effect:settings");

export const changeDispName = ({ client }: RootStore) => (name: string) => {
  log("changeDispName()", `${client.displayName} => ${name}`);
  client.displayName = name;
};

export const enableUserVideo = ({ media, ui, room }: RootStore) => async () => {
  log("enableUserVideo()");
  setSkipReplaceStream(true);

  const { videoInDevices } = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });

  // if not found just return
  if (videoInDevices.length === 0) {
    log("video devices are not found...");
    // TODO: notify
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

  if (room.isJoined) {
    log("re-entering room to use audio -> audio+video");

    if (room.room === null) {
      throw ui.showError(new Error("Room is null!"));
    }
    // force close the room, triggers re-entering
    room.room.close();
    setSkipReplaceStream(false);
  }
};

export const disableUserVideo = ({ media, room, ui }: RootStore) => () => {
  log("disableUserVideo()");
  setSkipReplaceStream(true);

  media.deleteUserTrack("video");

  if (room.isJoined) {
    log("re-entering room to use audio+video -> audio");

    if (room.room === null) {
      throw ui.showError(new Error("Room is null!"));
    }
    // force close the room, triggers re-entering
    room.room.close();
    setSkipReplaceStream(false);
  }
};

export const changeAudioDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeAudioDeviceId", deviceId);

  media.audioDeviceId = deviceId;
  const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(audioTrack);
};
export const changeVideoDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeVideoDeviceId", deviceId);

  media.videoDeviceId = deviceId;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(videoTrack);
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
