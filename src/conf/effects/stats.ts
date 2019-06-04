import debug from "debug";
import RootStore from "../stores";
const log = debug("effect:stats");

export const openStats = ({ ui }: RootStore) => () => {
  log("openStats()");
  ui.isStatsOpen = true;
};

export const closeStats = ({ ui }: RootStore) => () => {
  log("closeStats()");
  ui.isStatsOpen = false;
};
