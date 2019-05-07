import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { BlankVideo, Video } from "../components/video";

const PinnedStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { room } = store;
  return (
    <Observer>
      {() => {
        if (room.pinnedStream === null) {
          return <BlankVideo />;
        }

        return <Video stream={room.pinnedStream} isMine={false} />;
      }}
    </Observer>
  );
};

export default PinnedStream;
