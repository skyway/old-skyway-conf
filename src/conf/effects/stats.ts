import debug from "debug";
import { when } from "mobx";
import RootStore from "../stores";
import { normalizeStatsReport } from "../utils/webrtc";

const log = debug("effect:stats");

export const openStats = ({ ui, room }: RootStore) => () => {
  log("openStats()");
  ui.isStatsOpen = true;

  const timer = setInterval(async () => {
    const pc = room.getPeerConnection();
    if (pc === null) {
      return;
    }

    const statsReport = await pc.getStats().catch(err => {
      log("getStats() error", err);
      return null;
    });
    room.confStats =
      statsReport !== null ? normalizeStatsReport(statsReport) : null;
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
