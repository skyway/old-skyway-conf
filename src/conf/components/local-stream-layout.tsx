import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { VideoType } from "../utils/types";
import LocalStreamController from "./local-stream-controller";
import Video from "./video";

interface Props {
  stream: MediaStream;
  displayName: string;
  videoType: VideoType;
  isVideoDisabled: boolean;
  isVideoTrackMuted: boolean;
  isAudioTrackMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickToggleVideoMuted: () => void;
  onClickOpenSettings: () => void;
}
const LocalStreamLayout: FunctionComponent<Props> = ({
  stream,
  displayName,
  videoType,
  isVideoDisabled,
  isVideoTrackMuted,
  isAudioTrackMuted,
  onClickToggleAudioMuted,
  onClickToggleVideoMuted,
  onClickOpenSettings
}: Props) => (
  <div css={wrapperStyle}>
    <div css={videoStyle}>
      <Video
        stream={stream}
        isReverse={videoType === "camera"}
        isVideoOnly={true}
      />
      <div css={controllerStyle}>
        <LocalStreamController
          stream={stream}
          displayName={displayName}
          isVideoDisabled={isVideoDisabled}
          isVideoMuted={isVideoTrackMuted}
          isAudioMuted={isAudioTrackMuted}
          onClickToggleAudioMuted={onClickToggleAudioMuted}
          onClickToggleVideoMuted={onClickToggleVideoMuted}
          onClickOpenSettings={onClickOpenSettings}
        />
      </div>
    </div>
  </div>
);

export default LocalStreamLayout;

const wrapperStyle = css({
  outline: `1px solid ${globalColors.gray}`
});

const videoStyle = css({
  position: "relative",
  width: (165 / 3) * 4,
  height: 165
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1
});
