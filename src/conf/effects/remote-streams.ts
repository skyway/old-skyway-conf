import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:remote-streams");

export const setPinned = ({ room }: RootStore) => (id: string) => {
  log("setPinned()", id);
  room.pinnedId = id;
};
