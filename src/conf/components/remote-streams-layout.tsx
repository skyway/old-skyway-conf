import * as React from "react";
import { FunctionComponent } from "react";
import { RoomStream } from "skyway-js";
import { css } from "@emotion/core";
import { RoomStat } from "../utils/types";
import { rightMenuWidth, rightMenuTogglerHeight } from "../utils/style";
import RemoteStreamLayout from "./remote-stream-layout";

type StreamEntry = [string, RoomStream];
const sortByVideo: (a: StreamEntry, b: StreamEntry) => number = (
  [, aStream],
  [, bStream]
) =>
  aStream.getVideoTracks().length > bStream.getVideoTracks().length ? -1 : 1;

interface Props {
  streams: StreamEntry[];
  stats: [string, RoomStat][];
  pinnedId: string;
  onClickSetPinned: (id: string) => void;
}
const RemoteStreamsLayout: FunctionComponent<Props> = ({
  streams,
  stats,
  pinnedId,
  onClickSetPinned,
}: Props) => (
  <div css={wrapperStyle}>
    <div css={headStyle}>
      <span css={numberStyle}>{streams.length}</span> participant(s)
    </div>
    {streams.sort(sortByVideo).map(([peerId, stream]) => {
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
  width: rightMenuWidth,
});

const headStyle = css({
  height: rightMenuTogglerHeight,
  padding: 4,
  boxSizing: "border-box",
  fontSize: ".8rem",
  textAlign: "center",
});

const numberStyle = css({
  fontSize: ".9rem",
  fontWeight: "bold",
});
