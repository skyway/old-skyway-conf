import { reaction, toJS } from "mobx";
import debug from "debug";
import { isValidRoomName, isValidRoomType } from "../../shared/validate";
import RootStore from "../stores";

export const checkRoom = ({ ui }: RootStore) => {
  const log = debug("action:checkRoom");

  const [, roomType, roomName] = location.hash.split("/");

  if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
    ui.showError(new Error("Invalid room type and/or room name."));
  }

  log(`room: ${roomType}/${roomName}`);
};

export const initClient = async ({ ui, client }: RootStore) => {
  const log = debug("action:initClient");

  // get permission to perform enumerateDevices() correctly
  const permissionStream = (await navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .catch(ui.showError)) as MediaStream;

  const devices = await navigator.mediaDevices
    .enumerateDevices()
    .catch(ui.showError);

  // release refs
  permissionStream.getTracks().forEach(track => track.stop());

  client.load({
    ua: navigator.userAgent,
    devices: devices || [],
    name: localStorage.getItem("SkyWayConf.dispName") || "YOUR_NAME"
  });

  log(
    "client loaded",
    toJS(client.browser),
    client.videoInDevices,
    client.audioInDevices
  );
};

export const listenClientDeviceChange = ({ client, ui }: RootStore) => {
  const log = debug("action:listenClientDeviceChange");

  const disposer = reaction(
    () => [client.videoDeviceId, client.audioDeviceId],
    async ([videoDeviceId, audioDeviceId]) => {
      log("update stream", { videoDeviceId, audioDeviceId });

      const stream = (await navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: { exact: audioDeviceId } },
          video: { deviceId: { exact: videoDeviceId } }
        })
        .catch(ui.showError)) as MediaStream;

      // TODO: keep them as a MST
      console.log(stream);
    }
  );

  log("reaction added");

  return () => {
    log("reaction removed");
    disposer();
  };
};

export const listenGlobalDeviceChange = ({ ui, client }: RootStore) => {
  const log = debug("action:listenGlobalDeviceChange");

  // TODO: check it actually
  const handleDeviceChange = async () => {
    log("ondevicechange");
    const devices = await navigator.mediaDevices
      .enumerateDevices()
      .catch(ui.showError);
    client.updateDevices(devices || []);
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
