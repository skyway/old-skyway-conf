import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { VideoType, ClientBrowser } from "../utils/types";
import Modal from "./modal";
import Video from "./video";
import { IconButton } from "./icon";
import { SettingsItem, SettingsItemDevice } from "./settings-item";
import SettingsNameEdit from "./settings-name-edit";
import SettingsDeviceSelector from "./settings-device-selector";
import StreamController from "./stream-controller";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  defaultDispName: string;
  browser: ClientBrowser;
  hasGetDisplayMedia: boolean;
  hasUserVideoDevice: boolean;
  isReEntering: boolean;
  videoType: VideoType;
  isVideoTrackMuted: boolean;
  isAudioTrackMuted: boolean;
  videoDeviceId: string;
  audioDeviceId: string;
  videoInDevices: MediaDeviceInfo[];
  audioInDevices: MediaDeviceInfo[];
  onChangeVideoDeviceId: (deviceId: string) => void;
  onChangeAudioDeviceId: (deviceId: string) => void;
  onClickToggleVideoMuted: () => void;
  onClickToggleAudioMuted: () => void;
  onClickEnableUserVideo: () => void;
  onClickDisableUserVideo: () => void;
  onClickEnableDisplayVideo: () => void;
  onClickDisableDisplayVideo: () => void;
  onChangeDispName: (name: string) => void;
  onClickCloser: () => void;
}
const SettingsLayout: FunctionComponent<Props> = ({
  stream,
  defaultDispName,
  browser,
  hasGetDisplayMedia,
  hasUserVideoDevice,
  isReEntering,
  videoType,
  isVideoTrackMuted,
  isAudioTrackMuted,
  videoDeviceId,
  audioDeviceId,
  videoInDevices,
  audioInDevices,
  onChangeVideoDeviceId,
  onChangeAudioDeviceId,
  onClickToggleVideoMuted,
  onClickToggleAudioMuted,
  onClickEnableUserVideo,
  onClickDisableUserVideo,
  onClickEnableDisplayVideo,
  onClickDisableDisplayVideo,
  onChangeDispName,
  onClickCloser
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={videoStyle}>
        <Video
          stream={stream}
          isReverse={videoType === "camera"}
          isVideoOnly={true}
        />
        <div css={controllerStyle}>
          <StreamController
            displayName=""
            browser={browser}
            controllers={
              <>
                {videoType === null ? null : (
                  <IconButton
                    name={isVideoTrackMuted ? "videocam_off" : "videocam"}
                    onClick={onClickToggleVideoMuted}
                  />
                )}
                <IconButton
                  name={isAudioTrackMuted ? "mic_off" : "mic"}
                  onClick={onClickToggleAudioMuted}
                />
                <VADetector stream={stream} />
              </>
            }
          />
        </div>
      </div>

      <SettingsItem label="NAME">
        <SettingsNameEdit
          defaultDispName={defaultDispName}
          onChangeDispName={onChangeDispName}
        />
      </SettingsItem>
      <SettingsItemDevice label="MIC.">
        <button disabled>Disable</button>
        <SettingsDeviceSelector
          deviceId={audioDeviceId || ""}
          inDevices={audioInDevices}
          onChangeDeviceId={onChangeAudioDeviceId}
        />
      </SettingsItemDevice>
      {hasUserVideoDevice ? (
        <SettingsItemDevice label="CAMERA">
          {videoType === "camera" ? (
            <>
              <button onClick={onClickDisableUserVideo}>Disable</button>
              <SettingsDeviceSelector
                deviceId={videoDeviceId || ""}
                inDevices={videoInDevices}
                onChangeDeviceId={onChangeVideoDeviceId}
              />
            </>
          ) : (
            <button onClick={onClickEnableUserVideo}>Enable</button>
          )}
        </SettingsItemDevice>
      ) : null}
      {hasGetDisplayMedia ? (
        <SettingsItemDevice label="DISPLAY">
          {videoType === "display" ? (
            <>
              <button onClick={onClickDisableDisplayVideo}>Disable</button>
              <button onClick={onClickEnableDisplayVideo}>
                Use another display
              </button>
            </>
          ) : (
            <button onClick={onClickEnableDisplayVideo}>Enable</button>
          )}
        </SettingsItemDevice>
      ) : null}

      <IconButton name="done" onClick={onClickCloser} disabled={isReEntering} />
    </div>
  </Modal>
);

export default SettingsLayout;

const wrapperStyle = css({
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});

const videoStyle = css({
  position: "relative",
  width: "100%",
  height: 360
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1
});
