import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { ClientBrowser, VideoType } from "../utils/types";
import StreamController from "./stream-controller";
import Video from "./video";
import { IconButton } from "./icon";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  browser: ClientBrowser;
  videoType: VideoType;
  isVideoTrackMuted: boolean;
  isAudioTrackMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickToggleVideoMuted: () => void;
  onClickOpenSettings: () => void;
}
const LocalStreamLayout: FunctionComponent<Props> = ({
  stream,
  displayName,
  browser,
  videoType,
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
        <StreamController
          displayName={displayName}
          browser={browser}
          controllers={
            <>
              {videoType === null ? null : (
                <IconButton
                  name={isVideoTrackMuted ? "videocam_off" : "videocam"}
                  onClick={onClickToggleVideoMuted}
                />
              )}
              <IconButton
                name={isAudioTrackMuted ? "mic_off" : "mic"}
                onClick={onClickToggleAudioMuted}
              />
              <VADetector stream={stream} />
              <IconButton name="settings" onClick={onClickOpenSettings} />
            </>
          }
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
