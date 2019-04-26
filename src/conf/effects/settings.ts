import debug from "debug";
import RootStore from "../stores";
import { getUserDevices, getUserVideoTrack } from "../utils//webrtc";
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
