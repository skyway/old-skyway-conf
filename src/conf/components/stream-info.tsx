import * as React from "react";
import { memo, useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { ClientBrowser } from "../utils/types";
import { globalColors } from "../../shared/global-style";

interface Props {
  stream: MediaStream;
  browser: ClientBrowser;
}
const StreamInfo: FunctionComponent<Props> = ({ stream, browser }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    let timer = 0;
    const updateInfo = () => {
      timer = requestAnimationFrame(updateInfo);

      const [vTrack] = stream.getVideoTracks();
      const [aTrack] = stream.getAudioTracks();
      const vSettings = vTrack ? vTrack.getSettings() : {};

      setInfo({
        timestamp: Date.now(),
        browserName: browser.name,
        browserVersion: `v${browser.version}`,
        streamId: stream.id,
        video: vTrack
          ? {
              trackId: vTrack.id,
              width: vSettings.width,
              height: vSettings.height,
              frameRate: vSettings.frameRate,
            }
          : {},
        audio: aTrack
          ? {
              trackId: aTrack.id,
            }
          : {},
      });
    };
    timer = requestAnimationFrame(updateInfo);

    return () => cancelAnimationFrame(timer);
  }, [stream, browser, setInfo]);

  return <pre css={wrapperStyle}>{JSON.stringify(info, null, 2)}</pre>;
};

export default memo(StreamInfo);

const wrapperStyle = css({
  margin: 0,
  padding: 4,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  overflow: "auto",
  overflowScrolling: "touch",
  fontSize: ".8rem",
  backgroundColor: globalColors.black,
  color: globalColors.white,
});
