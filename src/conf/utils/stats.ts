type MediaKind = "audio" | "video";
interface StatsItem {
  [key: string]: string | number;
}

export const extractCandidatePairs = (stats: RTCStatsReport) => {
  const candidatePairs = [...stats.values()].filter(
    stat => stat.type === "candidate-pair"
  );
  // find candidates using now
  const selectedPairs = candidatePairs.filter(stat => {
    // Firefox only
    if ("selected" in stat) return stat.selected && stat.nominated;
    return stat.nominated;
  });

  return selectedPairs.map(({ localCandidateId, remoteCandidateId }) => {
    const localReport = stats.get(localCandidateId);
    const remoteReport = stats.get(remoteCandidateId);

    // must not be happened
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

export const extractOutboundRtps = (stats: RTCStatsReport) => {
  const outboundRtps = [...stats.values()].filter(
    stat => stat.type === "outbound-rtp"
  );
  // this app allows only audio / video / audio+video, max outbounds is 2
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
    const kind: MediaKind = stat.kind || stat.mediaType; // Safari
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

export const extractInboundRtps = (stats: RTCStatsReport) => {
  const inboundRtps = [...stats.values()].filter(
    stat => stat.type === "inbound-rtp"
  );

  const inbounds = {
    video: {
      size: 0,
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0,
      nackCount: 0,
      firCount: 0,
      pliCount: 0,
      items: [] as StatsItem[]
    },
    audio: {
      size: 0,
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0,
      items: [] as StatsItem[]
    }
  };
  for (const stat of inboundRtps) {
    const kind: MediaKind = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn(`unknown outbound rtp kind: ${kind} found!`);
    }

    // calc total
    inbounds[kind].size += 1;
    inbounds[kind].bytesReceived += stat.bytesReceived;
    inbounds[kind].packetsReceived += stat.packetsReceived;
    inbounds[kind].packetsLost += stat.packetsLost;
    if (kind === "video") {
      inbounds[kind].nackCount += stat.nackCount;
      inbounds[kind].firCount += stat.firCount;
      inbounds[kind].pliCount += stat.pliCount;
    }

    // each items
    const item: StatsItem = {
      bytesReceived: stat.bytesReceived,
      packetsReceived: stat.packetsReceived,
      packetsLost: stat.packetsLost,
      ssrc: stat.ssrc
    };
    if (kind === "video") {
      item.nackCount = stat.nackCount;
      item.firCount = stat.firCount;
      item.pliCount = stat.pliCount;
    }
    inbounds[kind].items.push(item);
  }

  return {
    audioInbounds: inbounds.audio,
    videoInbounds: inbounds.video
  };
};
