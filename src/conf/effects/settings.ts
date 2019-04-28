import debug from "debug";
import { reaction } from "mobx";
import RootStore from "../stores";
import {
  getUserDevices,
  getUserVideoTrack,
  getUserAudioTrack
} from "../utils/webrtc";
import { MeshRoom, SfuRoom, RoomStream } from "../utils/types";
const log = debug("effect:settings");

export const enableVideo = ({ media, ui }: RootStore) => async () => {
  log("enableVideo()");

  const { videoInDevices } = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });

  // if not found just return
  if (videoInDevices.length === 0) {
    log("video devices are not found...");
    return;
  }

  // keep video track
  const [{ deviceId }] = videoInDevices;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(videoTrack);

  // and get valid labels...
  const devices = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });
  media.setDevices(devices);

  log("devices updated", { ...devices });
};

export const changeDeviceId = ({ media, ui }: RootStore) => async (
  kind: MediaStreamTrack["kind"],
  deviceId: string
) => {
  log("changeDeviceId", kind, deviceId);

  if (kind === "audio") {
    media.audioDeviceId = deviceId;
    const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setUserTrack(audioTrack);
  }

  if (kind === "video") {
    media.videoDeviceId = deviceId;
    const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
      throw ui.showError(err);
    });
    media.setUserTrack(videoTrack);
  }
};

export const toggleMuted = ({ media }: RootStore) => async (
  kind: MediaStreamTrack["kind"]
) => {
  log("toggleMuted()", kind);
  media.toggleMuted(kind);
};

export const closeSettings = ({ ui }: RootStore) => async () => {
  log("closeSettings()");
  ui.isSettingsOpen = false;
};

export const joinConference = (store: RootStore) => async () => {
  log("joinConference()");
  const { ui, room, media } = store;

  // must not be happened
  if (room.isJoined) {
    throw ui.showError(new Error("Already in the room!"));
  }
  if (room.name === null || room.mode === null) {
    throw ui.showError(new Error("Room name or mode is undefined!"));
  }
  if (room.peer === null) {
    throw ui.showError(new Error("Peer is not created!"));
  }

  if (room.mode === "mesh") {
    room.room = room.peer.joinRoom<MeshRoom>(room.name, {
      mode: "mesh",
      stream: media.stream
    });
  } else if (room.mode === "sfu") {
    room.room = room.peer.joinRoom<SfuRoom>(room.name, {
      mode: "sfu",
      stream: media.stream
    });
  }

  // must not be happened
  if (room.room === null) {
    throw ui.showError(new Error("Room is null!"));
  }

  log("joined", room.room);

  reaction(
    () => media.stream,
    stream => {
      if (room.room === null) {
        return;
      }
      log("(Mesh|Sfu)Room.replaceStream()");
      room.room.replaceStream(stream);
    }
  );

  room.room.on("stream", (stream: RoomStream) => onRoomStream(store, stream));
  room.room.on("peerLeave", (peerId: string) => onRoomPeerLeave(store, peerId));
  // TODO: handlers to confRoom
  // room.room.on("data", (data: {}) => onRoomData(data));
  // room.room.on("close", () => onRoomClose());

  ui.isSettingsOpen = false;
};

const onRoomStream = ({ room }: RootStore, stream: RoomStream) => {
  log("onRoomStream()", stream);
  room.addStream(stream);
};

const onRoomPeerLeave = ({ room }: RootStore, peerId: string) => {
  log("onRoomPeerLeave()", peerId);
  room.removeStream(peerId);
};
