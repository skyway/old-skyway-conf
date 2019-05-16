import * as React from "react";
import { useState } from "react";
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
  onClickCastVideo: () => void;
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
  onClickCastVideo,
  onClickOpenSettings
}: Props) => {
  const [isMinimize, setMinimize] = useState(false);

  return (
    <div css={isMinimize ? [wrapperStyle, minimizeStyle] : wrapperStyle}>
      <div css={videoStyle}>
        <Video
          stream={stream}
          isReverse={videoType === "camera"}
          isVideoOnly={true}
        />
        <div css={actionStyle}>
          {videoType === null ? null : (
            <IconButton
              name="cast"
              title="Cast your video"
              onClick={onClickCastVideo}
            />
          )}
          <IconButton
            name="settings"
            title="Open settings"
            onClick={onClickOpenSettings}
          />
          {isMinimize ? (
            <IconButton
              name="maximize"
              title="Maximize"
              onClick={() => setMinimize(false)}
            />
          ) : (
            <IconButton
              name="minimize"
              title="Minimize"
              onClick={() => setMinimize(true)}
            />
          )}
        </div>
        <div css={controllerStyle}>
          <StreamController
            displayName={displayName}
            browser={browser}
            controllers={
              <>
                {videoType === null ? null : (
                  <IconButton
                    name={isVideoTrackMuted ? "videocam_off" : "videocam"}
                    title={isVideoTrackMuted ? "Unmute video" : "Mute video"}
                    onClick={onClickToggleVideoMuted}
                  />
                )}
                <IconButton
                  name={isAudioTrackMuted ? "mic_off" : "mic"}
                  title={isAudioTrackMuted ? "Unmute audio" : "Mute audio"}
                  onClick={onClickToggleAudioMuted}
                />
                <VADetector stream={stream} />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LocalStreamLayout;

const wrapperStyle = css({
  outline: `1px solid ${globalColors.gray}`,
  transition: "all .2s ease",
  willChange: "transform"
});

const minimizeStyle = css({
  transform: "translateY(90%)"
});

const localStreamWidth = 240;
const videoStyle = css({
  position: "relative",
  width: localStreamWidth,
  height: (localStreamWidth / 4) * 3
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
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  color: globalColors.white
});
