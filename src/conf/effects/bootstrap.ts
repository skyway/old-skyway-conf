import { EffectCallback } from "react";
import { toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import { getUserDevices } from "../utils//webrtc";
import { UserDevices } from "../utils/types";
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

export const ensureAudioDevice = ({
  ui,
  media
}: RootStore): EffectCallback => () => {
  log("ensureAudioDevice()");

  (async () => {
    const devices = (await getUserDevices().catch(err =>
      ui.showError(err)
    )) as UserDevices;
    media.updateDevices(devices);

    const hasAudioDevice = devices;

    if (!hasAudioDevice) {
      ui.showError(new Error("At least one audio input device needed!"));
    }

    log("devices", { ...devices });
  })();
};

export const loadClient = ({ client }: RootStore): EffectCallback => () => {
  log("initClient");

  client.load({
    ua: navigator.userAgent,
    name: localStorage.getItem("SkyWayConf.dispName") || "YOUR_NAME"
  });
  log("client loaded", toJS(client.browser));
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
