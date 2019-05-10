import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { VideoType } from "../utils/types";
import Modal from "./modal";
import Video from "./video";
import { IconButton } from "./icon";
import SettingsNameEdit from "./settings-name-edit";
import SettingsDeviceSelector from "./settings-device-selector";
import SettingsStreamController from "./settings-stream-controller";

interface Props {
  stream: MediaStream;
  defaultDispName: string;
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
          <SettingsStreamController
            stream={stream}
            displayName=""
            isVideoDisabled={videoType === null}
            isVideoMuted={isVideoTrackMuted}
            isAudioMuted={isAudioTrackMuted}
            onClickToggleAudioMuted={onClickToggleAudioMuted}
            onClickToggleVideoMuted={onClickToggleVideoMuted}
          />
        </div>
      </div>
      <SettingsNameEdit
        defaultDispName={defaultDispName}
        onChangeDispName={onChangeDispName}
      />
      {hasUserVideoDevice ? (
        <div>
          {videoType === "camera" ? (
            <>
              <button onClick={onClickDisableUserVideo}>
                disable user video
              </button>
              <SettingsDeviceSelector
                deviceId={videoDeviceId || ""}
                inDevices={videoInDevices}
                onChangeDeviceId={onChangeVideoDeviceId}
              />
            </>
          ) : (
            <button onClick={onClickEnableUserVideo}>enable user video</button>
          )}
        </div>
      ) : null}
      {hasGetDisplayMedia ? (
        <div>
          {videoType === "display" ? (
            <>
              <button onClick={onClickDisableDisplayVideo}>
                disable display video
              </button>
            </>
          ) : (
            <button onClick={onClickEnableDisplayVideo}>
              enable display video
            </button>
          )}
        </div>
      ) : null}
      <div>
        <SettingsDeviceSelector
          deviceId={audioDeviceId || ""}
          inDevices={audioInDevices}
          onChangeDeviceId={onChangeAudioDeviceId}
        />
      </div>
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
