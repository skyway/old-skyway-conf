import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import Modal from "./modal";
import { IconButton } from "./icon";

interface Props {
  onClickCloser: () => void;
}
const StatsLayout: FunctionComponent<Props> = ({ onClickCloser }: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={headStyle}>
        <IconButton name="close" onClick={onClickCloser} />
      </div>
      <div css={scrollerStyle} />
    </div>
  </Modal>
);

export default StatsLayout;

const wrapperStyle = css({
  display: "grid",
  gridTemplateRows: "20px 1fr 20px",
  width: modalContentWidth,
  height: "80%",
  boxSizing: "border-box",
  margin: "32px auto 0",
  padding: 8,
  backgroundColor: globalColors.white
});

const headStyle = css({
  textAlign: "right"
});

const scrollerStyle = css({
  overflowY: "scroll",
  overflowScrolling: "touch"
});
