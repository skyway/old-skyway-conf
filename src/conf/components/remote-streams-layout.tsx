import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import RemoteStreamLayout from "./remote-stream-layout";

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
      const isPinned = peerId === pinnedId;
      return (
        <RemoteStreamLayout
          key={peerId}
          stream={stream}
          stat={stat}
          isPinned={isPinned}
          onClickSetPinned={() => onClickSetPinned(peerId)}
        />
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
  fontSize: ".8rem",
  textAlign: "center"
});
