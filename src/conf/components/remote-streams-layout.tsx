import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import RemoteStreamController from "../components/remote-stream-controller";
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
  <div css={{ width: rightMenuWidth }}>
    <div css={headStyle}>{streams.length} participants</div>
    {streams.map(([peerId, stream]) => {
      const entry = stats.find(([id]) => id === peerId);
      const stat = entry ? entry[1] : null;
      return (
        <div
          key={peerId}
          css={wrapperStyle}
          onClick={() => onClickSetPinned(peerId)}
        >
          <div css={controllerStyle}>
            {stat !== null ? (
              <RemoteStreamController {...stat} stream={stream} />
            ) : null}
          </div>
          <div
            css={
              peerId === pinnedId ? [videoStyle, pinnedVideoStyle] : videoStyle
            }
          >
            <Video stream={stream} />
          </div>
        </div>
      );
    })}
  </div>
);

export default RemoteStreamsLayout;

const wrapperStyle = css({
  position: "relative"
});

const headStyle = css({
  height: rightMenuTogglerHeight,
  padding: 4,
  boxSizing: "border-box",
  fontSize: ".8rem",
  textAlign: "center"
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1
});

const videoStyle = css({
  position: "relative",
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
