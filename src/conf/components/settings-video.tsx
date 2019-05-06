import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";

interface Props {
  children: ReactNode;
}
const SettingsVideo: FunctionComponent<Props> = ({ children }) => (
  <div css={wrapperStyle}>{children}</div>
);

export default SettingsVideo;

const wrapperStyle = css({
  width: "100%",
  height: 360
});
