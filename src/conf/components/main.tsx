import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";

interface Props {
  children: ReactNode;
}
const Main: FunctionComponent<Props> = ({ children }) => (
  <div css={wrapperStyle}>{children}</div>
);

export default Main;

const wrapperStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundImage: "url(./images/logo.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
});
