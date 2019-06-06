import debug from "debug";
import { when } from "mobx";
import RootStore from "../stores";
import { normalizeStatsReport } from "../utils/webrtc";

const log = debug("effect:stats");

export const openStats = ({ ui, room }: RootStore) => () => {
  log("openStats()");
  ui.isStatsOpen = true;

  let timer = 0;
  const updateStats = async () => {
    timer = requestAnimationFrame(updateStats);

    const pc = room.getPeerConnection();
    if (pc === null) {
      return;
    }

    const statsReport = await pc.getStats().catch(err => {
      log("getStats() error", err);
      return null;
    });

    if (statsReport !== null) {
      room.confStats.replace(normalizeStatsReport(statsReport));
    } else {
      room.confStats.clear();
    }
  };
  timer = requestAnimationFrame(updateStats);

  // wait for closer
  when(
    () => !ui.isStatsOpen,
    () => {
      log("stop stats collector");
      cancelAnimationFrame(timer);
    }
  );
};

export const closeStats = ({ ui }: RootStore) => () => {
  log("closeStats()");
  ui.isStatsOpen = false;
};
