import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  video: ReactNode;
  children: ReactNode;
}
const SettingsLayout: FunctionComponent<Props> = ({
  video,
  children
}: Props) => (
  <div css={wrapperStyle}>
    <div css={videoStyle}>{video}</div>
    {children}
  </div>
);

export default SettingsLayout;

const wrapperStyle = css({
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});

const videoStyle = css({
  width: "100%",
  height: 360
});
