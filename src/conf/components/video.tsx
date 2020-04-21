import * as React from "react";
import { useRef, useEffect, memo } from "react";
import { FunctionComponent } from "react";
import debug from "debug";
import { css } from "@emotion/core";

const _log = debug("component:video");

interface Props {
  stream: MediaStream;
  isReverse?: boolean;
  isVideoOnly?: boolean;
}
const Video: FunctionComponent<Props> = ({
  stream,
  isReverse = false,
  isVideoOnly = false,
}) => {
  const isNoAudio = stream.getAudioTracks().length === 0;
  const isNoVideo = stream.getVideoTracks().length === 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const log = _log.extend(stream.id);

  useEffect(() => {
    const $video = videoRef.current;
    if (isNoVideo || $video === null) {
      return;
    }

    log("useEffect(): assign and play stream for video");
    $video.srcObject !== stream && ($video.srcObject = stream);
    $video.paused && $video.play();
  }, [isNoVideo, videoRef, log, stream]);
  useEffect(() => {
    const $audio = audioRef.current;
    if (isNoAudio || isVideoOnly || $audio === null) {
      return;
    }

    log("useEffect(): assign and play stream for audio");
    $audio.srcObject !== stream && ($audio.srcObject = stream);
    $audio.paused && $audio.play();
  }, [isNoAudio, isVideoOnly, audioRef, log, stream]);

  log("render()", [...stream.getTracks()]);
  return (
    <>
      {isNoVideo ? null : (
        <video
          css={isReverse ? [videoStyle, reverseVideoStyle] : videoStyle}
          ref={videoRef}
          playsInline
          muted={true}
        />
      )}
      {isVideoOnly || isNoAudio ? null : (
        <audio css={audioStyle} ref={audioRef} />
      )}
    </>
  );
};

export default memo(Video);

const audioStyle = css({
  display: "none",
});

const videoStyle = css({
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  pointerEvents: "none",
});

const reverseVideoStyle = css({
  transform: "scaleX(-1)",
});
