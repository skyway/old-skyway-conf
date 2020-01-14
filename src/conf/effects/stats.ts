import debug from "debug";
import { when } from "mobx";
import RootStore from "../stores";
import { normalizeStatsReport } from "../utils/webrtc";

const log = debug("effect:stats");

export const openStats = ({ ui, room }: RootStore) => () => {
  log("openStats()");
  ui.isStatsOpen = true;

  // 1000ms is enough(same as chrome://webrtc-internals)
  const timer = setInterval(async () => {
    const pc = room.getPeerConnection();
    if (pc === null) {
      return;
    }

    const statsReport = await pc.getStats().catch(err => {
      log("getStats() error", err);
      return null;
    });

    if (statsReport === null) {
      room.confStats.clear();
      return;
    }

    room.confStats.replace(normalizeStatsReport(statsReport));
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
