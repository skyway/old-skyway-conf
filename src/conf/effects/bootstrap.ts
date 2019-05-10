import { EffectCallback } from "react";
import { toJS, reaction } from "mobx";
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
    // just log it, do not trust them
    peer.on("error", console.error);
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
    const { audioInDevices } = await getUserDevices({ audio: true }).catch(
      err => {
        throw ui.showError(err);
      }
    );

    // must not be happened
    if (audioInDevices === null) {
      throw ui.showError(new Error("getUserDevices() returns null"));
    }
    if (audioInDevices.length === 0) {
      throw ui.showError(new Error("At least one audio input device needed!"));
    }

    // keep audio track
    const [{ deviceId }] = audioInDevices;
    const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setAudioTrack(audioTrack);

    // and get valid labels...
    const devices = await getUserDevices({ audio: true }).catch(err => {
      throw ui.showError(err);
    });
    media.setDevices(devices);

    log("devices updated", { ...devices });
  })();
};

export const loadClient = ({ client }: RootStore): EffectCallback => () => {
  log("loadClient()");

  client.load({
    ua: navigator.userAgent,
    hasGetDisplayMedia:
      typeof navigator.mediaDevices.getDisplayMedia === "function",
    name: localStorage.getItem("SkyWayConf.dispName") || "YOUR_NAME"
  });
  log("client loaded", toJS(client.browser));
};

export const listenStoreChanges = ({
  client,
  media,
  notification
}: RootStore): EffectCallback => () => {
  log("listenStoreChanges()");

  const disposers = [
    reaction(
      () => media.isAudioTrackMuted,
      muted => notification.showInfo(`${muted ? "Mute" : "Unmute"} audio track`)
    ),
    reaction(
      () => media.isVideoTrackMuted,
      muted => notification.showInfo(`${muted ? "Mute" : "Unmute"} video track`)
    ),
    reaction(
      () => client.displayName,
      name => {
        localStorage.setItem("SkyWayConf.dispName", name);
        notification.showInfo("Display name saved");
      },
      { delay: 2000 }
    )
  ];

  return () => disposers.forEach(d => d());
};

export const listenGlobalEvents = ({
  media,
  ui
}: RootStore): EffectCallback => () => {
  log("listenGlobalEvents()");

  const reloadOnHashChange = () => location.reload(true);
  const reloadOnDeviceAddOrRemoved = async () => {
    log("devicechange event fired");
    const { audioInDevices, videoInDevices } = await getUserDevices({
      video: true,
      audio: true
    }).catch(err => {
      throw ui.showError(err);
    });

    // must not be happened
    if (audioInDevices === null || videoInDevices === null) {
      throw ui.showError(new Error("getUserDevices() returns null"));
    }

    const curAudioInDevices = media.audioInDevices;
    const curVideoInDevices = media.videoInDevices;

    // Safari fires this event on updating label(num of devices are not changed)
    if (
      curAudioInDevices.length &&
      audioInDevices.length !== curAudioInDevices.length
    ) {
      location.reload(true);
    }
    if (
      curVideoInDevices.length &&
      videoInDevices.length !== curVideoInDevices.length
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
