import * as React from "react";
import { useRef, useEffect, memo } from "react";
import { FunctionComponent } from "react";
import debug from "debug";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

const _log = debug("component:video");

interface Props {
  stream: MediaStream;
}
const Video: FunctionComponent<Props> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const log = _log.extend(stream.id);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      const $video = videoRef.current;
      log("useEffect(): assign and play stream");
      $video.srcObject = stream;
      $video.paused && $video.play();
    }
  }, [videoRef, log, stream]);

  log("render()", [...stream.getTracks()]);
  return <video css={videoStyle} ref={videoRef} muted />;
};

export default memo(Video);

const videoStyle = css({
  backgroundColor: globalColors.black,
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none"
});
