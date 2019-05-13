import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth } from "../utils/style";
import Video from "./video";
import StreamController from "./stream-controller";
import { Icon, IconButton } from "./icon";
import VADetector from "./va-detector";

interface Props {
  stream: RoomStream;
  stat: RoomStat | null;
  isPinned: boolean;
  onClickSetPinned: () => void;
}
const RemoteStreamLayout: FunctionComponent<Props> = ({
  stream,
  stat,
  isPinned,
  onClickSetPinned
}: Props) => {
  const [isHover, setHover] = useState(false);
  const isVideoDisabled = stat && stat.isVideoDisabled ? true : false;

  return (
    <div
      css={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!isVideoDisabled && isHover ? (
        <div css={pinnedStyle}>
          <IconButton
            name={isPinned ? "cancel_presentation" : "present_to_all"}
            onClick={onClickSetPinned}
          />
        </div>
      ) : null}
      <div css={videoStyle}>
        <Video stream={stream} />
        <div css={controllerStyle}>
          {stat !== null ? (
            <StreamController
              displayName={stat.displayName}
              browser={stat.browser}
              controllers={
                <>
                  {stat.isVideoDisabled ? null : (
                    <Icon
                      name={stat.isVideoMuted ? "videocam_off" : "videocam"}
                    />
                  )}
                  <Icon name={stat.isAudioMuted ? "mic_off" : "mic"} />
                  <VADetector stream={stream} />
                </>
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RemoteStreamLayout;

const wrapperStyle = css({
  position: "relative"
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

  "& > button": {
    transform: "scale(2)",
    color: globalColors.white
  }
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10
});

const videoStyle = css({
  position: "relative",
  // 4:3
  height: (rightMenuWidth / 4) * 3
});
