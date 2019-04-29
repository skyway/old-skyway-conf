import { EffectCallback } from "react";
import { toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import { getUserDevices, getUserAudioTrack } from "../utils/webrtc";
import { initPeer } from "../utils/skyway";
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

  (async () => {
    const peer = await initPeer().catch(err => {
      throw ui.showError(err);
    });
    room.load({ mode: roomType as RoomInit["mode"], id: roomName }, peer);

    log(`room: ${roomType}/${roomName}`);
    log("peer instance created");
  })();
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

export const listenGlobalEvents = ({
  media,
  ui
}: RootStore): EffectCallback => () => {
  log("listenGlobalEvents");

  const reloadOnHashChange = () => location.reload(true);
  const reloadOnDeviceAddOrRemoved = async () => {
    const devices = await getUserDevices().catch(err => {
      throw ui.showError(err);
    });

    // Safari fires this event on updating label(num of devices are not changed)
    if (
      devices.audioInDevices.length !== media.audioInDevices.length ||
      devices.videoInDevices.length !== media.videoInDevices.length
    ) {
      location.reload(true);
    }
  };

  window.addEventListener("hashchange", reloadOnHashChange, false);
  navigator.mediaDevices.addEventListener(
    "devicechange",
    reloadOnDeviceAddOrRemoved,
    false
  );

  return () => {
    log("listener removed");
    window.removeEventListener("hashchange", reloadOnHashChange);
    navigator.mediaDevices.removeEventListener(
      "devicechange",
      reloadOnDeviceAddOrRemoved
    );
  };
};
