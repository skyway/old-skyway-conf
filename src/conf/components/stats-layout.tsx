import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { modalContentWidth } from "../utils/style";
import Modal from "./modal";
import { IconButton } from "./icon";

interface StatsReport {
  key: string;
  value: object;
  index: string;
}

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
  const filteredStats = filterStats(normalizeStatsReport(stats), searchKey);

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

const normalizeStatsReport = (
  statsReport: RTCStatsReport | null
): StatsReport[] => {
  if (statsReport === null) {
    return [];
  }

  const res = [];
  for (const [key, value] of statsReport) {
    res.push({ key, value, index: JSON.stringify(value) });
  }
  return res;
};

const filterStats = (stats: StatsReport[], searchKey: string) => {
  // stats not ready
  if (stats.length === 0) {
    return null;
  }

  // stats ready + no search
  const res: { [key: string]: StatsReport["value"] } = {};
  if (searchKey.trim().length === 0) {
    for (const stat of stats) {
      res[stat.key] = stat.value;
    }
    return res;
  }

  // search stats
  for (const stat of stats) {
    if (stat.index.includes(searchKey)) {
      res[stat.key] = stat.value;
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
