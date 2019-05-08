import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  top: ReactNode;
  bottom: ReactNode;
}
const LeftMenu: FunctionComponent<Props> = ({ top, bottom }: Props) => (
  <div css={wrapperStyle}>
    <div css={topStyle}>{top}</div>
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

const topStyle = css({
  position: "absolute",
  top: 8,
  left: 8
});

const bottomStyle = css({
  position: "absolute",
  left: 8,
  bottom: 8
});
