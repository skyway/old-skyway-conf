import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { IconButton } from "./icon";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickToggleVideoMuted: () => void;
  onClickOpenSettings: () => void;
}
const LocalStreamController: FunctionComponent<Props> = ({
  stream,
  displayName,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted,
  onClickToggleAudioMuted,
  onClickToggleVideoMuted,
  onClickOpenSettings
}: Props) => {
  const videoIcon = isVideoDisabled
    ? "videocam_off"
    : isVideoMuted
    ? "videocam_off"
    : "videocam";
  const audioIcon = isAudioMuted ? "mic_off" : "mic";

  return (
    <div css={wrapperStyle}>
      <div>{displayName}</div>
      <div css={buttonStyle}>
        <VADetector stream={stream} />
        {isVideoDisabled ? null : (
          <IconButton
            name={videoIcon}
            title={isVideoMuted ? "Unmute" : "Mute"}
            onClick={() => onClickToggleVideoMuted()}
          />
        )}
        <IconButton
          name={audioIcon}
          title={isAudioMuted ? "Unmute" : "Mute"}
          onClick={() => onClickToggleAudioMuted()}
        />
        <IconButton name="settings" onClick={() => onClickOpenSettings()} />
      </div>
    </div>
  );
};

export default LocalStreamController;

const wrapperStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: 4,
  color: globalColors.white,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  fontSize: ".8rem"
});

const buttonStyle = css({
  display: "inline-flex"
});
