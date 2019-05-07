import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import Video from "../components/video";

interface Props {
  streams: [string, RoomStream][];
  stats: [string, RoomStat][];
  pinnedId: string;
  onClickSetPinned: (id: string) => void;
}
const RemoteStreamsLayout: FunctionComponent<Props> = ({
  streams,
  stats,
  pinnedId,
  onClickSetPinned
}: Props) => (
  <div css={wrapperStyle}>
    <div css={headStyle}>{streams.length} participants</div>
    {streams.map(([peerId, stream]) => {
      const entry = stats.find(([id]) => id === peerId);
      const stat = entry ? entry[1] : null;
      return (
        <div
          css={
            pinnedId === peerId ? [videoStyle, pinnedVideoStyle] : videoStyle
          }
          key={peerId}
          onClick={() => onClickSetPinned(peerId)}
        >
          <div>{(stat && JSON.stringify(stat)) || "-"}</div>
          <Video stream={stream} />
        </div>
      );
    })}
  </div>
);

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
