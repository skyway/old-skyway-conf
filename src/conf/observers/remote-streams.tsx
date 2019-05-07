import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { setPinned } from "../effects/remote-streams";
import RemoteStreamsLayout from "../components/remote-streams-layout";

const RemoteStreams: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickSetPinned = useCallback(setPinned(store), [store]);

  const { room } = store;
  return (
    <Observer>
      {() => (
        <RemoteStreamsLayout
          streams={[...room.streams.entries()]}
          stats={[...room.stats.entries()]}
          pinnedId={room.pinnedId || ""}
          onClickSetPinned={onClickSetPinned}
        />
      )}
    </Observer>
  );
};

export default RemoteStreams;
