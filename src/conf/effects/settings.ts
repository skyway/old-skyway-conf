import debug from "debug";
import { reaction } from "mobx";
import RootStore from "../stores";
import {
  getUserDevices,
  getUserVideoTrack,
  getUserAudioTrack
} from "../utils/webrtc";
import {
  MeshRoom,
  SfuRoom,
  RoomStream,
  RoomData,
  RoomStat
} from "../utils/types";
const log = debug("effect:settings");

export const changeDispName = ({ client }: RootStore) => (name: string) => {
  log("changeDispName()", `${client.displayName} => ${name}`);
  client.displayName = name;
};

export const enableVideo = (store: RootStore) => async () => {
  log("enableVideo()");
  const { media, ui, room } = store;

  const { videoInDevices } = await getUserDevices().catch(err => {
    throw ui.showError(err);
  });

  // if not found just return
  if (videoInDevices.length === 0) {
    log("video devices are not found...");
    // TODO: notify
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

  if (room.isJoined) {
    log("re-enter room to use audio -> audio+video");

    if (room.room === null) {
      throw ui.showError(new Error("Room is null!"));
    }
    // force close the room, triggers re-entering
    room.room.close();
  }
};

export const changeAudioDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeAudioDeviceId", deviceId);

  media.audioDeviceId = deviceId;
  const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(audioTrack);
};
export const changeVideoDeviceId = ({ media, ui }: RootStore) => async (
  deviceId: string
) => {
  log("changeVideoDeviceId", deviceId);

  media.videoDeviceId = deviceId;
  const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
    throw ui.showError(err);
  });
  media.setUserTrack(videoTrack);
};

export const toggleAudioMuted = ({ media }: RootStore) => () => {
  log("toggleAudioMuted()");
  media.toggleMuted("audio");
};

export const toggleVideoMuted = ({ media }: RootStore) => () => {
  log("toggleVideoMuted()");
  media.toggleMuted("video");
};

export const closeSettings = ({ ui }: RootStore) => () => {
  log("closeSettings()");
  ui.isSettingsOpen = false;
};

export const joinConference = (store: RootStore) => () => {
  log("joinConference()");
  const { ui, room } = store;

  // must not be happened
  if (room.isJoined) {
    throw ui.showError(new Error("Already in the room!"));
  }

  joinRoom(store);

  ui.isSettingsOpen = false;
};

const joinRoom = (store: RootStore) => {
  const { room, ui, media, client } = store;

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

  const confRoom = room.room;
  // must not be happened
  if (confRoom === null) {
    throw ui.showError(new Error("Room is null!"));
  }

  log("joined room", confRoom);

  const disposers = [
    reaction(
      () => media.stream,
      stream => {
        log("reaction:replaceStream()");
        confRoom.replaceStream(stream);
      }
    ),
    reaction(
      () => ({ ...media.stat, ...client.stat }),
      stat => {
        log("reaction:send(stat)");
        confRoom.send({ type: "stat", payload: stat });
      }
    )
  ];

  confRoom.on("stream", (stream: RoomStream) => {
    log("on('stream')", stream);
    room.addStream(stream);

    // send back stat as welcome message
    confRoom.send({
      type: "stat",
      payload: { ...client.stat, ...media.stat }
    });
  });
  confRoom.on("peerLeave", (peerId: string) => {
    log("on('peerLeave')", peerId);
    room.removeStream(peerId);
  });
  confRoom.on("data", ({ src, data }) => {
    const { type, payload }: RoomData = data;
    log(`on('data/${type}')`, payload);

    if (type === "stat") {
      room.addStat(src, payload as RoomStat);
    }
  });
  confRoom.once("close", () => {
    log("on('close')");

    disposers.forEach(d => d());

    try {
      confRoom.removeAllListeners();
      room.cleanUp();
    } catch (err) {
      throw ui.showError(err);
    }

    // re-enter the same room automatically
    joinRoom(store);
  });
};
