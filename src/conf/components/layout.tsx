import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";

interface Props {
  children: ReactNode;
}
const Layout: FunctionComponent<Props> = ({ children }) => (
  <div css={wrapperStyle}>{children}</div>
);

export default Layout;

const wrapperStyle = css({
  height: "100vh",
  position: "relative",
});
