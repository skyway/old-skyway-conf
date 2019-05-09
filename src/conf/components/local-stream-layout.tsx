import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import LocalStreamController from "../components/local-stream-controller";
import Video from "../components/video";

interface Props {
  stream: MediaStream;
  displayName: string;
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
  isVideoDisabled,
  isVideoTrackMuted,
  isAudioTrackMuted,
  onClickToggleAudioMuted,
  onClickToggleVideoMuted,
  onClickOpenSettings
}: Props) => (
  <div css={wrapperStyle}>
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
    <div css={videoStyle}>
      <Video stream={stream} isReverse={true} isVideoOnly={true} />
    </div>
  </div>
);

export default LocalStreamLayout;

const wrapperStyle = css({
  position: "relative",
  outline: `1px solid ${globalColors.gray}`
});

const videoStyle = css({
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
