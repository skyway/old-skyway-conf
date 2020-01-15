import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import StatsLayout from "../components/stats-layout";
import { openStats, closeStats } from "../effects/stats";

export const StatsOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenStats = useCallback(openStats(store), [store]);

  return (
    <Observer>
      {() => <IconButton name="assessment" onClick={onClickOpenStats} />}
    </Observer>
  );
};

export const Stats: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickCloseStats = useCallback(closeStats(store), [store]);

  const { ui, room } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isStatsOpen) {
          return <></>;
        }

        return (
          <StatsLayout
            isSfu={room.mode === "sfu"}
            rtcStats={room.rtcStats}
            onClickCloser={onClickCloseStats}
          />
        );
      }}
    </Observer>
  );
};
