import { EffectCallback } from "react";
import debug from "debug";
import RootStore from "../stores";
import { getUserAudioTrack } from "../utils/webrtc";
const log = debug("effect:settings");

export const getAudioDevices = ({
  media,
  ui
}: RootStore): EffectCallback => () => {
  log("loadAudioDevices()");

  (async () => {
    const { audioDeviceId } = media;
    // must not be happened
    if (audioDeviceId === null) {
      throw ui.showError(new Error("No audio device!"));
    }

    const audioTrack = await getUserAudioTrack(audioDeviceId).catch(err => {
      throw ui.showError(err);
    });

    console.log(audioTrack);
  })();
};
