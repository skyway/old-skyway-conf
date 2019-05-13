import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  bottom: ReactNode;
}
const LeftMenu: FunctionComponent<Props> = ({ bottom }: Props) => (
  <div css={wrapperStyle}>
    <div css={bottomStyle}>{bottom}</div>
  </div>
);

export default LeftMenu;

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: zIndex.base
});

const bottomStyle = css({
  position: "absolute",
  left: 8,
  bottom: 8
});
