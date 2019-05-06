import * as React from "react";
import { useState } from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";

interface Props {
  controller: ReactNode;
  meta: ReactNode;
  video: ReactNode;
}
const LocalStreamLayout: FunctionComponent<Props> = ({
  controller,
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
      {isHover ? controller : null}
      <>{meta}</>
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
