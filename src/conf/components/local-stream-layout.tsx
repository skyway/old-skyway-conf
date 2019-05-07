import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  controller: ReactNode;
  video: ReactNode;
}
const LocalStreamLayout: FunctionComponent<Props> = ({
  controller,
  video
}: Props) => {
  return (
    <div css={wrapperStyle}>
      <div css={controllerStyle}>{controller}</div>
      <div css={videoStyle}>{video}</div>
    </div>
  );
};

export default LocalStreamLayout;

const videoWidth = 220;
const wrapperStyle = css({
  position: "relative",
  outline: `1px solid ${globalColors.gray}`
});

const videoStyle = css({
  width: videoWidth,
  height: (videoWidth / 4) * 3
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0
});
