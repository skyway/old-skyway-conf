import * as React from "react";
import { FunctionComponent } from "react";
import { RoomStream } from "../utils/types";
import { Icon } from "./icon";
import StreamController from "./stream-controller";
import VADetector from "./va-detector";

interface Props {
  stream: RoomStream;
  displayName: string;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
}
const RemoteStreamController: FunctionComponent<Props> = ({
  stream,
  displayName,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted
}: Props) => {
  const videoIcon = isVideoDisabled
    ? "videocam_off"
    : isVideoMuted
    ? "videocam_off"
    : "videocam";
  const audioIcon = isAudioMuted ? "mic_off" : "mic";

  return (
    <StreamController
      displayName={displayName}
      controllers={
        <>
          {isVideoDisabled ? null : <Icon name={videoIcon} />}
          <Icon name={audioIcon} />
          <VADetector stream={stream} />
        </>
      }
    />
  );
};

export default RemoteStreamController;
