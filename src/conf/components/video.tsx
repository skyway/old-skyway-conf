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
  const $video = useRef<HTMLVideoElement>(null);

  const log = _log.extend(stream.id);

  useEffect(() => {
    if ($video && $video.current) {
      if (stream.getTracks().length) {
        log("useEffect(): assign and play stream");
        $video.current.srcObject = stream;
        $video.current.paused && $video.current.play();
      }
    }
  }, [$video, log, stream]);

  log("render()", [...stream.getTracks()]);
  return <video css={videoStyle} ref={$video} muted />;
};

export default memo(Video);

const videoStyle = css({
  backgroundColor: globalColors.black
});
