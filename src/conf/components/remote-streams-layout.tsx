import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import Video from "../components/video";

interface Props {
  streams: RoomStream[];
  pinnedId: string;
  onClickSetPinned: (id: string) => void;
}
const RemoteStreamsLayout: FunctionComponent<Props> = ({
  streams,
  pinnedId,
  onClickSetPinned
}: Props) => {
  return (
    <div css={wrapperStyle}>
      <div css={headStyle}>{streams.length} participants</div>
      {streams.map((stream: RoomStream) => (
        <div
          css={
            pinnedId === stream.peerId
              ? [videoStyle, pinnedVideoStyle]
              : videoStyle
          }
          key={stream.peerId}
          onClick={() => onClickSetPinned(stream.peerId)}
        >
          <Video stream={stream} />
        </div>
      ))}
    </div>
  );
};

export default RemoteStreamsLayout;

const wrapperStyle = css({
  width: rightMenuWidth
});

const headStyle = css({
  height: rightMenuTogglerHeight,
  padding: 4,
  boxSizing: "border-box",
  textAlign: "center"
});

const videoStyle = css({
  // 4:3
  height: (rightMenuWidth / 4) * 3,
  boxSizing: "border-box",
  cursor: "pointer"
});

const pinnedVideoStyle = css({
  border: `2px solid ${globalColors.lightblue}`,
  cursor: "default",
  pointerEvents: "none"
});
