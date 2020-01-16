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
        {summarizedStats === null ? "Loading..." : summarizedStats}
      </pre>
    </div>
  );
};

export default StatsSummary;

const summarizeStats = (stats: RTCStatsReport) => {
  const candidatePairs = extractCandidatePairs(stats);
  const { audioOutbounds, videoOutbounds } = extractOutboundRtps(stats);
  const { audioInbounds, videoInbounds } = extractInboundRtps(stats);

  return `
# Active ICE candidate pairs
${candidatePairs
  .map(({ localCandidate, remoteCandidate }, idx) =>
    `
## Pair ${idx + 1}
- local: ${localCandidate.type} ${localCandidate.protocol}://${
      localCandidate.address
    }:${localCandidate.port}
- remote: ${remoteCandidate.type} ${remoteCandidate.protocol}://${
      remoteCandidate.address
    }:${remoteCandidate.port}
`.trim()
  )
  .join("\n")
  .trim()}

# Outbounds(sent)
## Audio
- ${audioOutbounds.bytesSent} bytes total
- ${audioOutbounds.packetsSent} packets total

## Video
- ${videoOutbounds.bytesSent} bytes total
- ${videoOutbounds.packetsSent} packets total

# Inbounds(received)
## Total
- ${audioInbounds.size} audio(s)
  - ${audioInbounds.bytesReceived} bytes total
  - ${audioInbounds.packetsReceived} packets total, ${
    audioInbounds.packetsLost
  } packets lost total
- ${videoInbounds.size} video(s)
  - ${videoInbounds.bytesReceived} bytes total
  - ${videoInbounds.packetsReceived} packets total, ${
    videoInbounds.packetsLost
  } packets lost total

## Details
${audioInbounds.items
  .map((item, idx) =>
    `
- Audio ${idx + 1}: ${item.ssrc}
  - ${item.bytesReceived} bytes total
  - ${item.packetsReceived} packets total, ${
      item.packetsLost
    } packets lost total
`.trim()
  )
  .join("\n")
  .trim()}
${videoInbounds.items
  .map((item, idx) =>
    `
- Video ${idx + 1}: ${item.ssrc}
  - ${item.bytesReceived} bytes total
  - ${item.packetsReceived} packets total, ${
      item.packetsLost
    } packets lost total
`.trim()
  )
  .join("\n")
  .trim()}

  `.trim();
};

// TODO: utils
const extractCandidatePairs = (stats: RTCStatsReport) => {
  // find candidates using now
  const candidatePairs = [...stats.values()].filter(
    stat => stat.type === "candidate-pair"
  );
  const selectedPairs = candidatePairs.filter(stat => {
    // Firefox only
    if ("selected" in stat) return stat.selected && stat.nominated;
    return stat.nominated;
  });

  return selectedPairs.map(({ localCandidateId, remoteCandidateId }) => {
    const localReport = stats.get(localCandidateId);
    const remoteReport = stats.get(remoteCandidateId);

    if (!localReport) {
      console.warn("localCandidate not found!");
    }
    if (!remoteReport) {
      console.warn("remoteCandidate not found!");
    }

    return {
      localCandidate: localReport
        ? {
            address: localReport.address || localReport.ip, // Chrome
            port: localReport.port,
            protocol: localReport.protocol,
            type: localReport.candidateType
          }
        : {},
      remoteCandidate: remoteReport
        ? {
            address: remoteReport.address || remoteReport.ip, // Chrome
            port: remoteReport.port,
            protocol: remoteReport.protocol,
            type: remoteReport.candidateType
          }
        : {}
    };
  });
};

const extractOutboundRtps = (stats: RTCStatsReport) => {
  const outboundRtps = [...stats.values()].filter(
    stat => stat.type === "outbound-rtp"
  );
  if (outboundRtps.length > 2) {
    console.warn("outbound-rtp reports are found more than 2!");
  }

  const outbounds = {
    video: {
      bytesSent: 0,
      packetsSent: 0
    },
    audio: {
      bytesSent: 0,
      packetsSent: 0
    }
  };
  for (const stat of outboundRtps) {
    const kind: "audio" | "video" = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn(`unknown outbound rtp kind: ${kind} found!`);
    }

    outbounds[kind].bytesSent += stat.bytesSent;
    outbounds[kind].packetsSent += stat.packetsSent;
  }

  return {
    audioOutbounds: outbounds.audio,
    videoOutbounds: outbounds.video
  };
};

const extractInboundRtps = (stats: RTCStatsReport) => {
  const inboundRtps = [...stats.values()].filter(
    stat => stat.type === "inbound-rtp"
  );

  const inbounds = {
    video: {
      size: 0,
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0,
      items: [] as { [key: string]: number }[]
    },
    audio: {
      size: 0,
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0,
      items: [] as { [key: string]: number }[]
    }
  };
  for (const stat of inboundRtps) {
    const kind: "audio" | "video" = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn(`unknown outbound rtp kind: ${kind} found!`);
    }

    // calc total
    inbounds[kind].size += 1;
    inbounds[kind].bytesReceived += stat.bytesReceived;
    inbounds[kind].packetsReceived += stat.packetsReceived;
    inbounds[kind].packetsLost += stat.packetsLost;
    // each items
    inbounds[kind].items.push({
      bytesReceived: stat.bytesReceived,
      packetsReceived: stat.packetsReceived,
      packetsLost: stat.packetsLost,
      ssrc: stat.ssrc
    });
  }

  return {
    audioInbounds: inbounds.audio,
    videoInbounds: inbounds.video
  };
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
