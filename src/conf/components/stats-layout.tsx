import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import { StatsReport } from "../utils/types";
import Modal from "./modal";
import { IconButton } from "./icon";

interface Props {
  isSfu: boolean;
  stats: StatsReport | null;
  onClickCloser: () => void;
}
const StatsLayout: FunctionComponent<Props> = ({
  isSfu,
  stats,
  onClickCloser
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={headStyle}>
        <IconButton name="close" onClick={onClickCloser} />
      </div>
      {isSfu ? (
        <div css={scrollerStyle}>
          <pre css={statsStyle}>
            {stats === null ? "Loading..." : JSON.stringify(stats, null, 2)}
          </pre>
        </div>
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
  margin: 0,
  padding: 4,
  boxSizing: "border-box",
  overflow: "scroll",
  overflowScrolling: "touch"
});

const statsStyle = css({
  fontSize: ".8rem"
});

const naStyle = css({
  textAlign: "center"
});
