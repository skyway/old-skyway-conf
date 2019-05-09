import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Modal from "../components/modal";
import Video from "../components/video";
import VADetector from "../components/va-detector";
import { IconButton } from "../components/icon";
import SettingsNameEdit from "../components/settings-name-edit";
import SettingsDeviceSelector from "../components/settings-device-selector";

interface Props {
  stream: MediaStream;
  defaultDispName: string;
  isReEntering: boolean;
  isUserVideoEnabled: boolean;
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
  onChangeDispName: (name: string) => void;
  onClickCloser: () => void;
}
const SettingsLayout: FunctionComponent<Props> = ({
  stream,
  defaultDispName,
  isReEntering,
  isUserVideoEnabled,
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
  onChangeDispName,
  onClickCloser
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={videoStyle}>
        <Video stream={stream} isReverse={true} isVideoOnly={true} />
      </div>
      <SettingsNameEdit
        defaultDispName={defaultDispName}
        onChangeDispName={onChangeDispName}
      />
      <div>
        {isUserVideoEnabled ? (
          <>
            <button onClick={onClickDisableUserVideo}>
              disable user video
            </button>
            <SettingsDeviceSelector
              deviceId={videoDeviceId || ""}
              inDevices={videoInDevices}
              onChangeDeviceId={onChangeVideoDeviceId}
            />
            <IconButton
              name={isVideoTrackMuted ? "videocam_off" : "videocam"}
              title={isVideoTrackMuted ? "Unmute" : "Mute"}
              onClick={onClickToggleVideoMuted}
            />
          </>
        ) : (
          <button onClick={onClickEnableUserVideo}>enable user video</button>
        )}
      </div>
      <div>
        <SettingsDeviceSelector
          deviceId={audioDeviceId || ""}
          inDevices={audioInDevices}
          onChangeDeviceId={onChangeAudioDeviceId}
        />
        <IconButton
          name={isAudioTrackMuted ? "mic_off" : "mic"}
          title={isAudioTrackMuted ? "Unmute" : "Mute"}
          onClick={onClickToggleAudioMuted}
        />
        <VADetector stream={stream} />
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
  width: "100%",
  height: 360
});
