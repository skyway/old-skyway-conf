import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "../contexts";
import { RoomStream } from "../utils/types";
import Video from "../components/video";

const RemoteStreams: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  console.count("RemoteStreams.render()");

  const { room } = store;
  return (
    <Observer>
      {() => {
        console.count("RemoteStreams.Observer.render()");

        return (
          <div css={wrapperStyle}>
            {[...room.streams.values()].map((stream: RoomStream) => (
              <div css={videoStyle} key={stream.peerId}>
                <Video stream={stream} isMine={false} />
              </div>
            ))}
          </div>
        );
      }}
    </Observer>
  );
};

export default RemoteStreams;

const wrapperStyle = css({
  // 4:3
  width: 200
});

const videoStyle = css({
  // 4:3
  height: 150
});
