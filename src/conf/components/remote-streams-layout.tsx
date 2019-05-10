import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import RemoteStreamController from "./remote-stream-controller";
import Video from "./video";
import { Icon } from "./icon";

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
      const isPinned = peerId === pinnedId;
      return (
        <div
          key={peerId}
          css={wrapperStyle}
          onClick={() => onClickSetPinned(peerId)}
        >
          {isPinned ? (
            <div css={pinnedStyle}>
              <Icon name="present_to_all" />
            </div>
          ) : null}
          <div css={controllerStyle}>
            {stat !== null ? (
              <RemoteStreamController {...stat} stream={stream} />
            ) : null}
          </div>
          <div css={videoStyle}>
            <Video stream={stream} />
          </div>
        </div>
      );
    })}
  </div>
);

export default RemoteStreamsLayout;

const wrapperStyle = css({
  position: "relative",
  cursor: "pointer"
});

const pinnedStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, .8)",

  "& > *": {
    fontSize: "2rem",
    color: globalColors.white
  }
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
  zIndex: 10
});

const videoStyle = css({
  // 4:3
  height: (rightMenuWidth / 4) * 3
});
