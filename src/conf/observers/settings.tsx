import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import Modal from "../components/modal";
import { Video } from "../components/video";
import SettingsLayout from "../components/settings-layout";
import SettingsNameEdit from "../components/settings-name-edit";
import SettingsDeviceSelector from "../components/settings-device-selector";
import {
  changeDispName,
  enableVideo,
  changeDeviceId,
  closeSettings,
  joinConference,
  toggleMuted
} from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onChangeDispName = useCallback(changeDispName(store), [store]);
  const onClickEnableVideo = useCallback(enableVideo(store), [store]);
  const onChangeDeviceId = useCallback(changeDeviceId(store), [store]);
  const onClickJoinConference = useCallback(joinConference(store), [store]);
  const onClickCloseSettings = useCallback(closeSettings(store), [store]);
  const onClickToggleMuted = useCallback(toggleMuted(store), [store]);

  const { ui, media, room, client } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <Modal>
            <SettingsLayout
              video={<Video stream={media.stream} isMine={true} />}
            >
              <SettingsNameEdit
                defaultDispName={client.displayName}
                onChangeDispName={name => onChangeDispName(name)}
              />
              <div>
                {media.isUserVideoEnabled ? (
                  <>
                    <SettingsDeviceSelector
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
                <SettingsDeviceSelector
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
            </SettingsLayout>
          </Modal>
        );
      }}
    </Observer>
  );
};

export default Settings;
