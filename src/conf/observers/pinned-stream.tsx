import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import Video from "../components/video";

const PinnedStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { room } = store;
  return (
    <Observer>
      {() => {
        if (room.pinnedStream === null) {
          return <></>;
        }

        return <Video stream={room.pinnedStream} isVideoOnly={true} />;
      }}
    </Observer>
  );
};

export default PinnedStream;
