import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import Modal from "./modal";
import { IconButton } from "./icon";

interface Props {
  isSfu: boolean;
  onClickCloser: () => void;
}
const StatsLayout: FunctionComponent<Props> = ({
  isSfu,
  onClickCloser
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={headStyle}>
        <IconButton name="close" onClick={onClickCloser} />
      </div>
      {isSfu ? (
        <div css={scrollerStyle} />
      ) : (
        <div css={naStyle}>Stats view is not available in mesh room type.</div>
      )}
    </div>
  </Modal>
);

export default StatsLayout;

const wrapperStyle = css({
  display: "grid",
  gridTemplateRows: "20px 1fr",
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

const naStyle = css({
  textAlign: "center"
});
