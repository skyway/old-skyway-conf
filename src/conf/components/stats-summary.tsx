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
  const { localCandidate, remoteCandidate } = extractCandidatePair(stats);
  const outboundRtps = extractOutboundRtps(stats);

  const res: { [key: string]: unknown } = {
    localCandidate,
    remoteCandidate,
    outboundRtps
  };

  console.warn(res);
  return res;
};

const extractCandidatePair = (stats: RTCStatsReport) => {
  // find candidates using now
  const candidatePairs = [...stats.values()].filter(
    stat => stat.type === "candidate-pair"
  );
  const selectedPairs = candidatePairs.filter(stat => {
    // Firefox only
    if ("selected" in stat) return stat.selected && stat.nominated;
    return stat.nominated;
  });
  if (selectedPairs.length !== 1) {
    console.warn("selected pairs are found more than 1!");
  }

  const [{ localCandidateId, remoteCandidateId }] = selectedPairs;
  const localReport = stats.get(localCandidateId);
  const remoteReport = stats.get(remoteCandidateId);

  if (!localReport) {
    console.warn("localCandidate not found!");
  }
  if (!remoteReport) {
    console.warn("remoteCandidate not found!");
  }

  return {
    localCandidate: {
      address: localReport.address || localReport.ip, // Chrome
      port: localReport.port,
      protocol: localReport.protocol,
      type: localReport.candidateType
    },
    remoteCandidate: {
      address: localReport.address || localReport.ip, // Chrome
      port: localReport.port,
      protocol: localReport.protocol,
      type: localReport.candidateType
    }
  };
};

const extractOutboundRtps = (stats: RTCStatsReport) => {
  const outboundRtps = [...stats.values()].filter(
    stat => stat.type === "outbound-rtp"
  );
  if (outboundRtps.length > 2) {
    console.warn("outbound-rtp reports are found more than 2!");
  }

  const summarized = outboundRtps.map(stat => ({
    ssrc: stat.ssrc,
    kind: stat.kind || stat.mediaType, // Safari
    bytesSent: stat.bytesSent,
    packetsSent: stat.packetsSent
  }));

  return summarized;
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
