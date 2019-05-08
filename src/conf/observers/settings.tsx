import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import SettingsLayout from "../components/settings-layout";
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
            stream={media.stream}
            defaultDispName={client.displayName}
            onChangeDispName={onChangeDispName}
            isUserVideoEnabled={media.isUserVideoEnabled}
            onClickEnableVideo={onClickEnableVideo}
            videoDeviceId={media.videoDeviceId || ""}
            audioDeviceId={media.audioDeviceId || ""}
            videoInDevices={media.videoInDevices}
            audioInDevices={media.audioInDevices}
            onChangeVideoDeviceId={onChangeVideoDeviceId}
            onChangeAudioDeviceId={onChangeAudioDeviceId}
            isVideoTrackMuted={media.isVideoTrackMuted}
            isAudioTrackMuted={media.isAudioTrackMuted}
            onClickToggleVideoMuted={onClickToggleVideoMuted}
            onClickToggleAudioMuted={onClickToggleAudioMuted}
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
