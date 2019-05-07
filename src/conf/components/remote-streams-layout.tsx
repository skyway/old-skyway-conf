import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { rightMenuWidth } from "../utils/style";
import { RoomStream } from "../utils/types";
import { globalColors } from "../../shared/global-style";
import { Video } from "../components/video";

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
      <div>{streams.length} participants</div>
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
          <Video stream={stream} isMine={false} />
        </div>
      ))}
    </div>
  );
};

export default RemoteStreamsLayout;

const wrapperStyle = css({
  width: rightMenuWidth
});

const videoStyle = css({
  // 4:3
  height: (rightMenuWidth / 4) * 3
});

const pinnedVideoStyle = css({
  border: `1px solid ${globalColors.white}`
});
