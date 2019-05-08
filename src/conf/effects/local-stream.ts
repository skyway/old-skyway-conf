import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:local-stream");

export const openSettings = ({ ui }: RootStore) => () => {
  log("openSettings()");
  ui.isSettingsOpen = true;
};

export const toggleAudioMuted = ({ media }: RootStore) => () => {
  log("toggleAudioMuted()");
  media.toggleMuted("audio");
};

export const toggleVideoMuted = ({ media }: RootStore) => () => {
  log("toggleVideoMuted()");
  media.toggleMuted("video");
};
