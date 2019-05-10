import * as React from "react";
import { FunctionComponent } from "react";
import { ClientBrowser, RoomStream } from "../utils/types";
import { Icon } from "./icon";
import StreamController from "./stream-controller";
import VADetector from "./va-detector";

interface Props {
  stream: RoomStream;
  displayName: string;
  browser: ClientBrowser;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
}
const RemoteStreamController: FunctionComponent<Props> = ({
  stream,
  displayName,
  browser,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted
}: Props) => (
  <StreamController
    displayName={displayName}
    browser={browser}
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
