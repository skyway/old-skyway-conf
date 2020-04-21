type MediaKind = "audio" | "video";
interface StatsItem {
  [key: string]: number;
}

export const extractCandidatePairs = (stats: RTCStatsReport) => {
  const candidatePairs = [...stats.values()].filter(
    (stat) => stat.type === "candidate-pair"
  );
  // find candidates using now
  const selectedPairs = candidatePairs.filter((stat) => {
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
            type: localReport.candidateType,
          }
        : {},
      remoteCandidate: remoteReport
        ? {
            address: remoteReport.address || remoteReport.ip, // Chrome
            port: remoteReport.port,
            protocol: remoteReport.protocol,
            type: remoteReport.candidateType,
          }
        : {},
    };
  });
};

export const extractOutboundRtps = (stats: RTCStatsReport) => {
  const outboundRtps = [...stats.values()].filter(
    (stat) => stat.type === "outbound-rtp"
  );
  // this app allows only audio / video / audio+video, max outbounds is 2
  if (outboundRtps.length > 2) {
    console.warn("outbound-rtp reports are found more than 2!");
  }

  const outbounds = {
    video: {
      bytesSent: 0,
      packetsSent: 0,
    },
    audio: {
      bytesSent: 0,
      packetsSent: 0,
    },
  };
  for (const stat of outboundRtps) {
    const kind: MediaKind = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn(`unknown outbound rtp kind: ${kind} found!`);
      continue;
    }

    outbounds[kind].bytesSent += stat.bytesSent;
    outbounds[kind].packetsSent += stat.packetsSent;
  }

  return {
    audioOutbounds: outbounds.audio,
    videoOutbounds: outbounds.video,
  };
};

export const extractInboundRtps = (stats: RTCStatsReport) => {
  const inboundRtps = [...stats.values()].filter(
    (stat) => stat.type === "inbound-rtp"
  );

  const videoInbounds = {
    size: 0,
    bytesReceived: 0,
    packetsReceived: 0,
    packetsLost: 0,
    nackCount: 0,
    firCount: 0,
    pliCount: 0,
    items: [] as StatsItem[],
  };
  const audioInbounds = {
    size: 0,
    bytesReceived: 0,
    packetsReceived: 0,
    packetsLost: 0,
    items: [] as StatsItem[],
  };

  // each items
  for (const stat of inboundRtps) {
    const item: StatsItem = {
      bytesReceived: stat.bytesReceived,
      packetsReceived: stat.packetsReceived,
      packetsLost: stat.packetsLost,
      ssrc: stat.ssrc,
    };

    const kind: MediaKind = stat.kind || stat.mediaType; // Safari
    if (kind !== "audio" && kind !== "video") {
      console.warn(`unknown outbound rtp kind: ${kind} found!`);
      continue;
    }

    if (kind === "video") {
      // Firefox misses these counts for inactive media
      item.nackCount = stat.nackCount || 0;
      item.firCount = stat.firCount || 0;
      item.pliCount = stat.pliCount || 0;
      videoInbounds.items.push(item);
    }
    if (kind === "audio") {
      audioInbounds.items.push(item);
    }
  }

  // calc total
  for (const item of videoInbounds.items) {
    videoInbounds.size += 1;
    videoInbounds.bytesReceived += item.bytesReceived;
    videoInbounds.packetsReceived += item.packetsReceived;
    videoInbounds.packetsLost += item.packetsLost;
    videoInbounds.nackCount += item.nackCount;
    videoInbounds.firCount += item.firCount;
    videoInbounds.pliCount += item.pliCount;
  }
  for (const item of audioInbounds.items) {
    audioInbounds.size += 1;
    audioInbounds.bytesReceived += item.bytesReceived;
    audioInbounds.packetsReceived += item.packetsReceived;
    audioInbounds.packetsLost += item.packetsLost;
  }

  return {
    videoInbounds,
    audioInbounds,
  };
};
