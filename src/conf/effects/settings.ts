import { EffectCallback } from "react";
import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:settings");

export const getAudioDevices = ({
  media,
  ui
}: RootStore): EffectCallback => () => {
  log("loadAudioDevices()");
  media;
  ui;
};
