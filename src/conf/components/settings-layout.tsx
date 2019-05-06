import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  children: ReactNode;
}
const SettingsLayout: FunctionComponent<Props> = ({ children }) => (
  <div css={wrapperStyle}>{children}</div>
);

export default SettingsLayout;

const wrapperStyle = css({
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});
