import * as React from "react";
import { useState } from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Icon from "./icon";

interface Props {
  onClickOpenSettings: () => void;
  meta: ReactNode;
  video: ReactNode;
}
const LocalStreamLayout: FunctionComponent<Props> = ({
  onClickOpenSettings,
  meta,
  video
}: Props) => {
  const [isHover, setHover] = useState(false);

  return (
    <div
      css={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isHover ? (
        <div css={overlayStyle}>
          <button css={buttonStyle} onClick={() => onClickOpenSettings()}>
            <Icon name="settings" />
          </button>
        </div>
      ) : null}
      <div css={metaStyle}>{meta}</div>
      <div css={videoStyle}>{video}</div>
    </div>
  );
};

export default LocalStreamLayout;

const videoWidth = 180;
const wrapperStyle = css({
  position: "relative"
});

const videoStyle = css({
  width: videoWidth,
  height: (videoWidth / 4) * 3
});

const metaStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "0 4px",
  backgroundColor: "rgba(0, 0, 0, 0.8)"
});

const overlayStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.8)"
});

const buttonStyle = css({
  position: "absolute",
  top: 8,
  right: 8,
  padding: 0,
  appearance: "none",
  border: "none",
  background: "none",
  color: globalColors.white,
  cursor: "pointer"
});
