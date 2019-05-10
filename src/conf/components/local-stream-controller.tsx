import * as React from "react";
import { FunctionComponent } from "react";
import { ClientBrowser } from "../utils/types";
import { IconButton } from "./icon";
import StreamController from "./stream-controller";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  browser: ClientBrowser;
  isVideoDisabled: boolean;
  isVideoMuted: boolean;
  isAudioMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickToggleVideoMuted: () => void;
  onClickOpenSettings: () => void;
}
const LocalStreamController: FunctionComponent<Props> = ({
  stream,
  displayName,
  browser,
  isVideoDisabled,
  isVideoMuted,
  isAudioMuted,
  onClickToggleAudioMuted,
  onClickToggleVideoMuted,
  onClickOpenSettings
}: Props) => (
  <StreamController
    displayName={displayName}
    browser={browser}
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
        <IconButton name="settings" onClick={onClickOpenSettings} />
      </>
    }
  />
);

export default LocalStreamController;
