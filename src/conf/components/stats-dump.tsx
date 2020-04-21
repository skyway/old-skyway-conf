import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

interface Props {
  rtcStats: RTCStatsReport | null;
}
const StatsDump: FunctionComponent<Props> = ({ rtcStats }: Props) => {
  const [searchKey, setSearchKey] = useState("");
  const filteredStats =
    rtcStats === null ? null : filterStats(rtcStats, searchKey.trim());

  return (
    <>
      <input
        type="text"
        placeholder="filter stat reports"
        value={searchKey}
        onChange={(ev) => setSearchKey(ev.target.value)}
        css={inputStyle}
      />
      <pre css={statsStyle}>
        {filteredStats === null
          ? "Loading..."
          : `${filteredStats.size} report(s) found.\n${JSON.stringify(
              filteredStats.reports,
              null,
              2
            )}`}
      </pre>
    </>
  );
};

export default StatsDump;

const filterStats = (stats: RTCStatsReport, searchKey: string) => {
  // stats not ready
  if (stats.size === 0) {
    return null;
  }

  let size = 0;
  const res: { [key: string]: unknown } = {};
  for (const [key, value] of stats) {
    const index = JSON.stringify(value);
    // empty string is treated as included
    if (index.includes(searchKey)) {
      res[key] = value;
      size++;
    }
  }
  return { reports: res, size };
};

const inputStyle = css({
  boxSizing: "border-box",
  width: "100%",
});

const statsStyle = css({
  margin: 0,
  padding: 4,
  fontSize: ".8rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});
