import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "../contexts";
import { RoomStream } from "../utils/types";
import { rightMenuWidth } from "../utils/style";
import Video from "../components/video";

const RemoteStreams: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  console.count("RemoteStreams.render()");

  const { room } = store;
  return (
    <Observer>
      {() => {
        console.count("RemoteStreams.Observer.render()");

        const streams = [...room.streams.values()];
        return (
          <div css={wrapperStyle}>
            <div>{streams.length} participants</div>
            {streams.map((stream: RoomStream) => (
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
  width: rightMenuWidth
});

const videoStyle = css({
  // 4:3
  height: (rightMenuWidth / 4) * 3
});
