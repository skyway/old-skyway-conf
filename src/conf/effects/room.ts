import debug from "debug";
import { reaction } from "mobx";
import {
  MeshRoom,
  SfuRoom,
  RoomStream,
  RoomData,
  RoomStat,
  RoomChat
} from "../utils/types";
import RootStore from "../stores";

const log = debug("effect:room");

export const joinRoom = (store: RootStore) => {
  log("joinRoom()");
  const { room, ui, media, client, notification } = store;

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
  notification.showInfo(`You joined the room ${room.name}`);

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
    ),
    reaction(
      () => room.myLastChat,
      chat => {
        if (chat === null) {
          return;
        }
        log("reaction:send(chat)");
        confRoom.send({ type: "chat", payload: chat });
      }
    )
  ];

  confRoom.on("stream", (stream: RoomStream) => {
    log("on('stream')", stream);
    room.streams.set(stream.peerId, stream);

    // send back stat as welcome message
    confRoom.send({
      type: "stat",
      payload: { ...client.stat, ...media.stat }
    });
  });

  confRoom.on("peerLeave", (peerId: string) => {
    log("on('peerLeave')", peerId);

    const stat = room.stats.get(peerId);
    if (stat) {
      notification.showLeave(stat.displayName);
    }
    room.removeStream(peerId);
  });

  confRoom.on("data", ({ src, data }) => {
    const { type, payload }: RoomData = data;

    switch (type) {
      case "stat": {
        const stat = payload as RoomStat;
        log("on('data/stat')", stat);

        // undefined means first time = just joined
        if (!room.stats.get(src)) {
          notification.showJoin(stat.displayName);
        }
        room.stats.set(src, stat);
        break;
      }
      case "chat": {
        const chat = payload as RoomChat;
        log("on('data/chat')", chat);

        room.addRemoteChat(chat);
        break;
      }
      default: {
        log(`on('data/unknown') discard...`);
      }
    }
  });

  confRoom.once("close", () => {
    log("on('close')");
    notification.showInfo("room closed! trying re-connect..");

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
