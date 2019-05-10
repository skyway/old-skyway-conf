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
}: Props) => (
  <StreamController
    displayName={displayName}
    controllers={
      <>
        {isVideoDisabled ? null : (
          <Icon name={isVideoMuted ? "videocam_off" : "videocam"} />
        )}
        <Icon name={isAudioMuted ? "mic_off" : "mic"} />
        <VADetector stream={stream} />
      </>
    }
  />
);

export default RemoteStreamController;
