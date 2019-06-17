import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { RoomStream } from "skyway-js";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomStat } from "../utils/types";
import { rightMenuWidth } from "../utils/style";
import Video from "./video";
import StreamController from "./stream-controller";
import { Icon, IconButton } from "./icon";
import VADetector from "./va-detector";
import StreamInfo from "./stream-info";

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
  const isVideoDisabled = stat && stat.isVideoDisabled ? true : false;
  const [isInfoShown, setInfoShown] = useState(false);

  return (
    <>
      <div css={videoStyle}>
        <Video stream={stream} />
        <div css={actionStyle}>
          {!isVideoDisabled ? (
            <IconButton
              name={isPinned ? "cancel_presentation" : "present_to_all"}
              title="Pin this video"
              onClick={onClickSetPinned}
            />
          ) : null}
          <IconButton
            name="info"
            title="Toggle stream info"
            onClick={() => setInfoShown(!isInfoShown)}
          />
        </div>
        {isInfoShown ? (
          <div css={infoStyle}>
            <StreamInfo stream={stream} />
          </div>
        ) : null}
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
    </>
  );
};

export default RemoteStreamLayout;

const videoStyle = css({
  position: "relative",
  height: (rightMenuWidth / 4) * 3
});

const infoStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 10
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1
});

const actionStyle = css({
  position: "absolute",
  top: 4,
  right: 4,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  color: globalColors.white
});
