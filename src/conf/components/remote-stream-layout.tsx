import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStream, RoomStat } from "../utils/types";
import { rightMenuWidth } from "../utils/style";
import Video from "./video";
import StreamController from "./stream-controller";
import { Icon } from "./icon";
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
}: Props) => (
  <div css={wrapperStyle} onClick={onClickSetPinned}>
    {isPinned ? (
      <div css={pinnedStyle}>
        <Icon name="present_to_all" />
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

export default RemoteStreamLayout;

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
