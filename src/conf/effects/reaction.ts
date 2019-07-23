import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:reaction");

export const toggleReaction = ({ ui }: RootStore) => () => {
  log(`toggleReaction() -> ${!ui.isReactionOpen}`);
  ui.isReactionOpen = !ui.isReactionOpen;
};

export const sendReaction = ({ room, client }: RootStore) => (
  reaction: string
) => {
  log("sendReaction()", reaction);
  room.addReaction(client.displayName, reaction);
};
