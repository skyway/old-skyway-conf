import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { Icon, IconButton } from "./icon";

interface Props {
  displayName: string;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
}
const RemoteStreamController: FunctionComponent<Props> = ({
  displayName,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted
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
        {isVideoDisabled ? null : <Icon name={videoIcon} />}
        <Icon name={audioIcon} />
        <IconButton name="info" onClick={() => alert("TODO")} />
      </div>
    </div>
  );
};

export default RemoteStreamController;

const wrapperStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: 4,
  color: globalColors.white,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  fontSize: ".8rem"
});

const buttonStyle = css({
  display: "inline-flex",
  textAlign: "right"
});
