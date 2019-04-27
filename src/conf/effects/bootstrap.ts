import { EffectCallback } from "react";
import { toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import { getUserDevices, getUserAudioTrack } from "../utils/webrtc";
import { RoomInit } from "../utils/types";
import RootStore from "../stores";

const log = debug("effect:bootstrap");

export const checkRoomSetting = ({
  ui,
  room
}: RootStore): EffectCallback => () => {
  log("checkRoomSetting()");
  const [, roomType, roomName] = location.hash.split("/");

  if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
    throw ui.showError(new Error("Invalid room type and/or room name."));
  }

  log(`room: ${roomType}/${roomName}`);
  room.load({ mode: roomType as RoomInit["mode"], id: roomName });
};

export const ensureAudioDevice = ({
  ui,
  media
}: RootStore): EffectCallback => () => {
  log("ensureAudioDevice()");

  (async () => {
    // check at least audio input exists
    const { audioInDevices } = await getUserDevices().catch(err => {
      throw ui.showError(err);
    });

    if (audioInDevices.length === 0) {
      throw ui.showError(new Error("At least one audio input device needed!"));
    }

    // keep audio track
    const [{ deviceId }] = audioInDevices;
    const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setUserTrack(audioTrack);

    // and get valid labels...
    const devices = await getUserDevices().catch(err => {
      throw ui.showError(err);
    });
    media.setDevices(devices);

    log("devices updated", { ...devices });
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
