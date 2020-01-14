import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import Modal from "./modal";
import { IconButton } from "./icon";

interface Props {
  isSfu: boolean;
  stats: RTCStatsReport | null;
  onClickCloser: () => void;
}
const StatsLayout: FunctionComponent<Props> = ({
  isSfu,
  stats,
  onClickCloser
}: Props) => {
  const [searchKey, setSearchKey] = useState("");
  const filteredStats = filterStats(stats, searchKey.trim());

  return (
    <Modal>
      <div css={wrapperStyle}>
        <div css={headStyle}>
          <IconButton name="close" onClick={onClickCloser} />
        </div>
        <input
          type="text"
          placeholder="filter stats"
          value={searchKey}
          onChange={ev => setSearchKey(ev.target.value)}
        />
        {isSfu ? (
          <div css={scrollerStyle}>
            <pre css={statsStyle}>
              {filteredStats === null
                ? "Loading..."
                : JSON.stringify(filteredStats, null, 2)}
            </pre>
          </div>
        ) : (
          <div css={naStyle}>
            Stats view is not available in mesh room type.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StatsLayout;

const filterStats = (stats: RTCStatsReport | null, searchKey: string) => {
  // stats not ready
  if (!stats || stats.size === 0) {
    return null;
  }

  const res: { [key: string]: unknown } = {};
  for (const [key, value] of stats) {
    const index = JSON.stringify(value);
    // empty string is treated as included
    if (index.includes(searchKey)) {
      res[key] = value;
    }
  }
  return res;
};

const wrapperStyle = css({
  display: "grid",
  gridTemplateRows: "20px 20px 1fr",
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
  boxSizing: "border-box",
  overflow: "scroll",
  overflowScrolling: "touch"
});

const statsStyle = css({
  margin: 0,
  padding: 4,
  fontSize: ".8rem"
});

const naStyle = css({
  textAlign: "center"
});
