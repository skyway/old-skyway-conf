import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  children: ReactNode;
}
const LeftMenu: FunctionComponent<Props> = ({ children }) => (
  <div css={wrapperStyle}>{children}</div>
);

export default LeftMenu;

const wrapperStyle = css({
  position: "absolute",
  left: 8,
  bottom: 8,
  zIndex: zIndex.base,
  width: 200
});
