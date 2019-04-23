import { reaction, toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import RootStore from "../stores";

export const checkRoomSetting = ({ ui }: RootStore) => {
  const log = debug("action:checkRoomSetting");

  const [, roomType, roomName] = location.hash.split("/");

  if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
    ui.showError(new Error("Invalid room type and/or room name."));
  }

  log(`room: ${roomType}/${roomName}`);
};

export const initClientAndMedia = async ({ ui, client, media }: RootStore) => {
  const log = debug("action:initClientAndMedia");

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
};

export const listenClientDeviceChange = ({ media, ui }: RootStore) => {
  const log = debug("action:listenClientDeviceChange");

  log("reaction added");
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

export const listenGlobalDeviceChange = ({ ui, media }: RootStore) => {
  const log = debug("action:listenGlobalDeviceChange");

  // TODO: check it actually
  const handleDeviceChange = async () => {
    log("ondevicechange");
    const devices = await navigator.mediaDevices
      .enumerateDevices()
      .catch(ui.showError);
    media.updateDevices(devices || []);
  };
  navigator.mediaDevices.addEventListener(
    "devicechange",
    handleDeviceChange,
    false
  );

  log("listener added");

  return () => {
    log("listener removed");
    navigator.mediaDevices.removeEventListener(
      "devicechange",
      handleDeviceChange
    );
  };
};
