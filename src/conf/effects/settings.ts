import { EffectCallback } from "react";
// import { reaction } from "mobx";
import debug from "debug";
import RootStore from "../stores";
import { getUserAudioTrack } from "../utils/webrtc";
const log = debug("effect:settings");

export const getAudioDevices = ({ media }: RootStore): EffectCallback => () => {
  log("loadAudioDevices()");

  (async () => {
    const { audioDeviceId } = media;
    // must not be happened
    if (audioDeviceId === null) {
      throw new Error("No audio device!");
    }

    const audioTrack = await getUserAudioTrack(audioDeviceId);

    console.log(audioTrack);
  })();
};
