import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import Video from "../components/video";
import VADetector from "../components/va-detector";
import { IconButton } from "../components/icon";
import SettingsLayout from "../components/settings-layout";
import SettingsNameEdit from "../components/settings-name-edit";
import SettingsDeviceSelector from "../components/settings-device-selector";
import {
  changeDispName,
  enableVideo,
  changeVideoDeviceId,
  changeAudioDeviceId,
  closeSettings,
  joinConference,
  toggleVideoMuted,
  toggleAudioMuted
} from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onChangeDispName = useCallback(changeDispName(store), [store]);
  const onClickEnableVideo = useCallback(enableVideo(store), [store]);
  const onChangeVideoDeviceId = useCallback(changeVideoDeviceId(store), [
    store
  ]);
  const onChangeAudioDeviceId = useCallback(changeAudioDeviceId(store), [
    store
  ]);
  const onClickJoinConference = useCallback(joinConference(store), [store]);
  const onClickCloseSettings = useCallback(closeSettings(store), [store]);
  const onClickToggleAudioMuted = useCallback(toggleAudioMuted(store), [store]);
  const onClickToggleVideoMuted = useCallback(toggleVideoMuted(store), [store]);

  const { ui, media, room, client } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <SettingsLayout
            video={<Video stream={media.stream} isMine={true} />}
            client={
              <SettingsNameEdit
                defaultDispName={client.displayName}
                onChangeDispName={onChangeDispName}
              />
            }
            media={
              <>
                <div>
                  {media.isUserVideoEnabled ? (
                    <>
                      <SettingsDeviceSelector
                        deviceId={media.videoDeviceId || ""}
                        inDevices={media.videoInDevices}
                        onChangeDeviceId={onChangeVideoDeviceId}
                      />
                      <IconButton
                        name={
                          media.isVideoTrackMuted ? "videocam_off" : "videocam"
                        }
                        title={media.isVideoTrackMuted ? "Unmute" : "Mute"}
                        onClick={onClickToggleVideoMuted}
                      />
                    </>
                  ) : (
                    <button onClick={onClickEnableVideo}>enable video</button>
                  )}
                </div>
                <div>
                  <SettingsDeviceSelector
                    deviceId={media.audioDeviceId || ""}
                    inDevices={media.audioInDevices}
                    onChangeDeviceId={onChangeAudioDeviceId}
                  />
                  <IconButton
                    name={media.isAudioTrackMuted ? "mic_off" : "mic"}
                    title={media.isAudioTrackMuted ? "Unmute" : "Mute"}
                    onClick={onClickToggleAudioMuted}
                  />
                  <VADetector stream={media.stream} />
                </div>
              </>
            }
            onClickCloser={
              room.isJoined ? onClickCloseSettings : onClickJoinConference
            }
          />
        );
      }}
    </Observer>
  );
};

export default Settings;
