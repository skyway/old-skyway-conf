import * as React from "react";
import { useRef, useEffect, memo } from "react";
import { FunctionComponent } from "react";
import debug from "debug";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

const _log = debug("component:video");

interface Props {
  stream: MediaStream;
  isReverse?: boolean;
  isVideoOnly?: boolean;
}
const Video: FunctionComponent<Props> = ({
  stream,
  isReverse = false,
  isVideoOnly = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const log = _log.extend(stream.id);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    const $video = videoRef.current;
    log("useEffect(): assign and play stream");
    $video.srcObject = stream;
    $video.paused && $video.play();
  }, [videoRef, log, stream]);
  useEffect(() => {
    if (isVideoOnly || audioRef.current === null) {
      return;
    }
    const $audio = audioRef.current;
    $audio.srcObject = stream;
    $audio.paused && $audio.play();
  }, [isVideoOnly, audioRef, stream]);

  log("render()", [...stream.getTracks()]);
  return (
    <>
      <video
        css={isReverse ? [videoStyle, reverseVideoStyle] : videoStyle}
        ref={videoRef}
        muted={true}
      />
      {isVideoOnly ? null : <audio css={audioStyle} ref={audioRef} />}
    </>
  );
};

export default memo(Video);

const audioStyle = css({
  display: "none"
});

const videoStyle = css({
  backgroundColor: globalColors.black,
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none"
});

const reverseVideoStyle = css({
  transform: "scaleX(-1)"
});
