import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:local-stream");

export const openSettings = ({ ui }: RootStore) => () => {
  log("openSettings()");
  ui.isSettingsOpen = true;
};

export const toggleMuted = ({ media }: RootStore) => (
  kind: MediaStreamTrack["kind"]
) => {
  log("toggleMuted()", kind);
  media.toggleMuted(kind);
};
