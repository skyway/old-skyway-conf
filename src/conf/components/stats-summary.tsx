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
  const { localCandidate, remoteCandidate } = extractCandidatePair(stats);
  const { audioOutbounds, videoOutbounds } = extractOutboundRtps(stats);
  const { audioInbounds, videoInbounds } = extractInboundRtps(stats);

  return `
# ice-candidate
- local: ${localCandidate.type} ${localCandidate.protocol}://${localCandidate.address}:${localCandidate.port}
- remote: ${remoteCandidate.type} ${remoteCandidate.protocol}://${remoteCandidate.address}:${remoteCandidate.port}

# outbounds(send)
- ${audioOutbounds.size} audio(s): ${audioOutbounds.bytesSent} bytes ${audioOutbounds.packetsSent} packets
- ${videoOutbounds.size} video(s): ${videoOutbounds.bytesSent} bytes ${videoOutbounds.packetsSent} packets

# inbounds(recv)
- ${audioInbounds.size} audio(s): ${audioInbounds.bytesReceived} bytes, ${audioInbounds.packetsReceived} packets, ${audioInbounds.packetsLost} packets lost
- ${videoInbounds.size} video(s): ${videoInbounds.bytesReceived} bytes, ${videoInbounds.packetsReceived} packets, ${videoInbounds.packetsLost} packets lost
  `.trim();
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
      address: remoteReport.address || remoteReport.ip, // Chrome
      port: remoteReport.port,
      protocol: remoteReport.protocol,
      type: remoteReport.candidateType
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

  const outbounds = {
    video: {
      size: 0,
      bytesSent: 0,
      packetsSent: 0
    },
    audio: {
      size: 0,
      bytesSent: 0,
      packetsSent: 0
    }
  };
  for (const stat of outboundRtps) {
    const kind: "audio" | "video" = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn("unknown outbound rtp kind found!");
    }

    outbounds[kind].size += 1;
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
      packetsLost: 0
    },
    audio: {
      size: 0,
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0
    }
  };
  for (const stat of inboundRtps) {
    const kind: "audio" | "video" = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn("unknown outbound rtp kind found!");
    }

    inbounds[kind].size += 1;
    inbounds[kind].bytesReceived += stat.bytesReceived;
    inbounds[kind].packetsReceived += stat.packetsReceived;
    inbounds[kind].packetsLost += stat.packetsLost;
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
