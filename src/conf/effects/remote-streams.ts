import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:remote-streams");

export const setPinned = ({ room }: RootStore) => (id: string) => {
  const pinnedId = room.pinnedId === id ? null : id;
  log("setPinned()", pinnedId);

  room.pinnedId = pinnedId;
};
