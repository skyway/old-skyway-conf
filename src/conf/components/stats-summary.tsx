import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

interface Props {
  rtcStats: RTCStatsReport | null;
}
const StatsSummary: FunctionComponent<Props> = ({ rtcStats }: Props) => {
  const summarizedStats = rtcStats === null ? null : summarizeStats(rtcStats);

  return (
    <div css={wrapperStyle}>
      <pre css={statsStyle}>
        {summarizedStats === null
          ? "Loading..."
          : JSON.stringify(summarizedStats, null, 2)}
      </pre>
    </div>
  );
};

export default StatsSummary;

const summarizeStats = (stats: RTCStatsReport) => {
  const statsValues = [...stats.values()];

  // find candidates using now
  const candidatePairs = statsValues.filter(
    stat => stat.type === "candidate-pair"
  );
  const selectedPairs = candidatePairs.filter(stat => {
    // Firefox
    if ("selected" in stat) return stat.selected && stat.nominated;
    return stat.nominated;
  });
  if (selectedPairs.length !== 1) {
    console.warn("selected pairs are found more than 1!");
  }

  const [{ localCandidateId, remoteCandidateId }] = selectedPairs;
  const localCandidate = stats.get(localCandidateId);
  const remoteCandidate = stats.get(remoteCandidateId);

  if (!localCandidate) {
    console.warn("localCandidate not found!");
  }
  if (!remoteCandidate) {
    console.warn("remoteCandidate not found!");
  }

  console.log(localCandidate);
  console.log(remoteCandidate);

  const res: { [key: string]: unknown } = {};
  for (const value of [remoteCandidate, localCandidate]) {
    switch (value.type) {
      case "local-candidate": {
        res.localCandidate = {
          address: value.address || value.ip || "N/A",
          port: value.port || "N/A",
          protocol: value.protocol || "N/A",
          type: value.candidateType || "N/A",
          // for Chrome
          network: value.networkType || "N/A"
        };
        break;
      }
      case "remote-candidate": {
        res.remoteCandidate = {
          address: value.address || value.ip || "N/A",
          port: value.port || "N/A",
          protocol: value.protocol || "N/A",
          type: value.candidateType || "N/A"
        };
        break;
      }
      case "inbound-rtp": {
        break;
      }
      case "outbound-rtp": {
        break;
      }
    }
  }

  console.warn(res);
  return res;
};

const wrapperStyle = css({
  margin: 0,
  padding: 4,
  fontSize: ".8rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all"
});

const statsStyle = css({
  margin: 0,
  padding: 4,
  fontSize: ".8rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all"
});
