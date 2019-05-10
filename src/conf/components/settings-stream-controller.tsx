import * as React from "react";
import { FunctionComponent } from "react";
import { IconButton } from "./icon";
import StreamController from "./stream-controller";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickToggleVideoMuted: () => void;
}
const SettingsStreamController: FunctionComponent<Props> = ({
  stream,
  displayName,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted,
  onClickToggleAudioMuted,
  onClickToggleVideoMuted
}: Props) => (
  <StreamController
    displayName={displayName}
    controllers={
      <>
        {isVideoDisabled ? null : (
          <IconButton
            name={isVideoMuted ? "videocam_off" : "videocam"}
            onClick={onClickToggleVideoMuted}
          />
        )}
        <IconButton
          name={isAudioMuted ? "mic_off" : "mic"}
          onClick={onClickToggleAudioMuted}
        />
        <VADetector stream={stream} />
      </>
    }
  />
);

export default SettingsStreamController;
