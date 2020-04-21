import debug from "debug";
import { reaction, observe } from "mobx";
import { MeshRoom, SfuRoom, RoomStream } from "skyway-js";
import {
  RoomData,
  RoomStat,
  RoomChat,
  RoomReaction,
  RoomCast,
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

  const roomOptions = {
    mode: room.mode,
    stream: media.stream,
    // this app requires audio, but video is optional
    videoReceiveEnabled: true,
  };
  if (room.useH264) {
    Object.assign(roomOptions, { videoCodec: "H264" });
  }

  if (room.mode === "mesh") {
    room.room = room.peer.joinRoom<MeshRoom>(room.name, roomOptions);
  } else if (room.mode === "sfu") {
    room.room = room.peer.joinRoom<SfuRoom>(room.name, roomOptions);
  }

  const confRoom = room.room;
  // must not be happened
  if (confRoom === null) {
    throw ui.showError(new Error("Room is null!"));
  }

  log("joined room", confRoom);
  log("w/ options:", roomOptions);

  // force set to false
  ui.isReEntering = false;

  const disposers = [
    reaction(
      () => ({ ...media.stat, ...client.stat }),
      (stat) => {
        log("reaction:send(stat)");
        confRoom.send({ type: "stat", payload: stat });
      }
    ),
    reaction(
      () => room.myLastChat,
      (chat) => {
        if (chat === null) {
          return;
        }
        log("reaction:send(chat)");
        confRoom.send({ type: "chat", payload: chat });
      }
    ),
    reaction(
      () => room.myLastReaction,
      (reaction) => {
        if (reaction === null) {
          return;
        }
        log("reaction:send(reaction)");
        confRoom.send({ type: "reaction", payload: reaction });
      }
    ),
    reaction(
      () => room.castRequestCount,
      () => {
        log("reaction:send(cast)");
        confRoom.send({ type: "cast", payload: { from: client.displayName } });
      }
    ),
    observe(media, "videoDeviceId", (change) => {
      log("observe(media.videoDeviceId)");
      if (!room.isJoined) {
        log("do nothing before room join");
        return;
      }

      // camera OR display was changed, not need to re-enter
      if (change.oldValue !== null && change.newValue !== null) {
        log("just change video by replaceStream(), no need to re-enter");
        confRoom.replaceStream(media.stream);
        return;
      }

      // camera OR display was enabled, need to re-enter
      // camera OR display was disabled, need to re-enter
      log("need to re-enter the room to add/remove video");
      if (room.room === null) {
        throw ui.showError(new Error("Room is null!"));
      }
      // force close the room, triggers re-entering
      ui.isReEntering = true;
      room.room.close();
      notification.showInfo("Re-enter the room to add/remove video");
    }),
  ];

  confRoom.on("stream", (stream: RoomStream) => {
    log("on('stream')", stream);
    room.streams.set(stream.peerId, stream);

    // send back stat as welcome message
    confRoom.send({
      type: "stat",
      payload: { ...client.stat, ...media.stat },
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

        // notify only when chat is closed
        ui.isChatOpen || notification.showChat(chat.from, chat.text);
        room.addRemoteChat(chat);
        break;
      }
      case "reaction": {
        const reaction = payload as RoomReaction;
        notification.showReaction(reaction.from, reaction.reaction);
        break;
      }
      case "cast": {
        const cast = payload as RoomCast;
        log("on('data/cast')", cast);
        room.pinnedId = src;
        notification.showInfo(`Video was casted by ${cast.from}`);
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

    disposers.forEach((d) => d());

    try {
      confRoom.removeAllListeners();
      room.cleanUp();
    } catch (err) {
      throw ui.showError(err);
    }

    // re-enter the same room automatically but with delay to ensure leave -> join
    setTimeout(() => joinRoom(store), 500);
  });
};
