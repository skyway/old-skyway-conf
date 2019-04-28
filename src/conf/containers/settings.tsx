import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";
import Modal from "../components/modal";
import Video from "../components/video";
import DeviceSelector from "../components/device-selector";
import {
  enableVideo,
  changeDeviceId,
  closeSettings,
  joinConference,
  toggleMuted
} from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickEnableVideo = useCallback(enableVideo(store), [store]);
  const onChangeDeviceId = useCallback(changeDeviceId(store), [store]);
  const onClickJoinConference = useCallback(joinConference(store), [store]);
  const onClickCloseSettings = useCallback(closeSettings(store), [store]);
  const onClickToggleMuted = useCallback(toggleMuted(store), [store]);

  const { ui, media, room } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <Modal>
            <div css={wrapperStyle}>
              <div css={videoStyle}>
                <Video stream={media.stream} />
              </div>
              <div>
                {media.isUserVideoEnabled ? (
                  <>
                    <DeviceSelector
                      deviceId={media.videoDeviceId || ""}
                      inDevices={media.videoInDevices}
                      onChangeDeviceId={deviceId =>
                        onChangeDeviceId("video", deviceId)
                      }
                    />
                    <button onClick={() => onClickToggleMuted("video")}>
                      {media.isVideoTrackMuted ? "unmute" : "mute"}
                    </button>
                  </>
                ) : (
                  <button onClick={onClickEnableVideo}>enable video</button>
                )}
              </div>
              <div>
                <DeviceSelector
                  deviceId={media.audioDeviceId || ""}
                  inDevices={media.audioInDevices}
                  onChangeDeviceId={deviceId =>
                    onChangeDeviceId("audio", deviceId)
                  }
                />
                <button onClick={() => onClickToggleMuted("audio")}>
                  {media.isAudioTrackMuted ? "unmute" : "mute"}
                </button>
              </div>

              <button
                onClick={
                  room.isJoined ? onClickCloseSettings : onClickJoinConference
                }
              >
                OK
              </button>
            </div>
          </Modal>
        );
      }}
    </Observer>
  );
};

export default Settings;

const wrapperStyle = css({
  // 4:3
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});

const videoStyle = css({
  // 4:3
  height: 360
});