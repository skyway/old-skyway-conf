import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:chat");

export const openChat = ({ ui }: RootStore) => () => {
  log("openChat()");
  ui.isChatOpen = true;
};

export const closeChat = ({ ui }: RootStore) => () => {
  log("closeChat()");
  ui.isChatOpen = false;
};

export const sendChat = ({ room }: RootStore) => (text: string) => {
  if (text.length === 0) {
    return;
  }

  log("sendChat()", text);
  room;
};
