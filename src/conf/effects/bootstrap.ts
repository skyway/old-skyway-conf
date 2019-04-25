import { EffectCallback } from "react";
import { toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import { getUserDevices } from "../utils//webrtc";
import RootStore from "../stores";
const log = debug("effect:bootstrap");

export const checkRoomSetting = ({ ui }: RootStore): EffectCallback => () => {
  log("checkRoomSetting()");
  const [, roomType, roomName] = location.hash.split("/");

  if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
    ui.showError(new Error("Invalid room type and/or room name."));
  }

  log(`room: ${roomType}/${roomName}`);
};

export const ensureAudioDevice = ({ ui }: RootStore): EffectCallback => () => {
  log("ensureAudioDevice()");

  (async () => {
    const devices = await getUserDevices().catch(err => ui.showError(err));

    const hasAudioDevice = devices;

    if (!hasAudioDevice) {
      ui.showError(new Error("At least one audio input device needed!"));
    }
  })();
};

export const initClientAndMedia = ({
  ui,
  client,
  media
}: RootStore): EffectCallback => () => {
  log("initClientAndMedia");

  (async () => {
    client.load({
      ua: navigator.userAgent,
      name: localStorage.getItem("SkyWayConf.dispName") || "YOUR_NAME"
    });
    log("client loaded", toJS(client.browser));

    // get permission to perform enumerateDevices() correctly
    const permissionStream = (await navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .catch(ui.showError)) as MediaStream;

    const devices = await navigator.mediaDevices
      .enumerateDevices()
      .catch(ui.showError);
    media.updateDevices(devices || []);

    // release refs
    permissionStream.getTracks().forEach(track => track.stop());

    log("media", media.videoInDevices, media.audioInDevices);
  })();
};

export const listenGlobalEvents = (): EffectCallback => () => {
  log("listenGlobalEvents");

  const reload = () => location.reload(true);

  window.addEventListener("hashchange", reload, false);
  navigator.mediaDevices.addEventListener("devicechange", reload, false);

  return () => {
    log("listener removed");
    window.removeEventListener("hashchange", reload);
    navigator.mediaDevices.removeEventListener("devicechange", reload);
  };
};
