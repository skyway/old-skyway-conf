import { EffectCallback } from "react";
import { reaction } from "mobx";
import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:settings");

export const listenClientDeviceChange = ({
  media,
  ui
}: RootStore): EffectCallback => () => {
  log("listenClientDeviceChange");

  const disposer = reaction(
    () => [media.videoDeviceId, media.audioDeviceId],
    async ([videoDeviceId, audioDeviceId]) => {
      log("update stream", { videoDeviceId, audioDeviceId });

      const stream = (await navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: { exact: audioDeviceId } },
          video: { deviceId: { exact: videoDeviceId } }
        })
        .catch(ui.showError)) as MediaStream;
      media.setTrack(stream);
    }
  );

  return () => {
    log("reaction removed");
    disposer();
  };
};
