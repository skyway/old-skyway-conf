import debug from "debug";
import { when } from "mobx";
import RootStore from "../stores";
const log = debug("effect:stats");

export const openStats = ({ ui, room }: RootStore) => () => {
  log("openStats()");
  ui.isStatsOpen = true;

  const timer = setInterval(() => {
    const pc = room.getPeerConnection();
    // TODO: getStats()
    // TODO: parse and generate our stats
    console.warn(pc);

    const stats = {
      timestamp: Date.now()
    };
    room.confStats = stats;
  }, 1000);

  // wait for closer
  when(
    () => !ui.isStatsOpen,
    () => {
      log("stop stats collector");
      clearInterval(timer);
    }
  );
};

export const closeStats = ({ ui }: RootStore) => () => {
  log("closeStats()");
  ui.isStatsOpen = false;
};
