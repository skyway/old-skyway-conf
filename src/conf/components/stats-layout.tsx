import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import Modal from "./modal";
import { IconButton } from "./icon";
import StatsSummary from "./stats-summary";
import StatsDump from "./stats-dump";

interface Props {
  isSfu: boolean;
  rtcStats: RTCStatsReport | null;
  onClickCloser: () => void;
}
const StatsLayout: FunctionComponent<Props> = ({
  isSfu,
  rtcStats,
  onClickCloser,
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={headStyle}>
        <IconButton name="close" onClick={onClickCloser} />
      </div>
      {isSfu ? (
        <div css={scrollerStyle}>
          <details open>
            <summary>Stats summary</summary>
            <StatsSummary rtcStats={rtcStats} />
          </details>
          <details>
            <summary>Stats dump</summary>
            <StatsDump rtcStats={rtcStats} />
          </details>
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
  backgroundColor: globalColors.white,
});

const headStyle = css({
  textAlign: "right",
});

const scrollerStyle = css({
  boxSizing: "border-box",
  overflow: "hidden",
  overflowY: "scroll",
  overflowScrolling: "touch",
});

const naStyle = css({
  textAlign: "center",
});
