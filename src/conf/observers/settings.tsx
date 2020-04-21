import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import SettingsLayout from "../components/settings-layout";
import {
  changeDispName,
  enableUserVideo,
  disableUserVideo,
  enableDisplayVideo,
  disableDisplayVideo,
  changeVideoDeviceId,
  changeAudioDeviceId,
  closeSettings,
  joinConference,
  toggleVideoMuted,
  toggleAudioMuted,
} from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onChangeDispName = useCallback(changeDispName(store), [store]);
  const onClickEnableUserVideo = useCallback(enableUserVideo(store), [store]);
  const onClickDisableUserVideo = useCallback(disableUserVideo(store), [store]);
  const onClickEnableDisplayVideo = useCallback(enableDisplayVideo(store), [
    store,
  ]);
  const onClickDisableDisplayVideo = useCallback(disableDisplayVideo(store), [
    store,
  ]);
  const onChangeVideoDeviceId = useCallback(changeVideoDeviceId(store), [
    store,
  ]);
  const onChangeAudioDeviceId = useCallback(changeAudioDeviceId(store), [
    store,
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
            browser={client.browser}
            hasGetDisplayMedia={client.hasGetDisplayMedia}
            hasUserVideoDevice={client.hasUserVideoDevice}
            onChangeDispName={onChangeDispName}
            videoType={media.videoType}
            onClickEnableUserVideo={onClickEnableUserVideo}
            onClickDisableUserVideo={onClickDisableUserVideo}
            onClickEnableDisplayVideo={onClickEnableDisplayVideo}
            onClickDisableDisplayVideo={onClickDisableDisplayVideo}
            videoDeviceId={media.videoDeviceId || ""}
            audioDeviceId={media.audioDeviceId || ""}
            videoInDevices={media.videoInDevices.slice()}
            audioInDevices={media.audioInDevices.slice()}
            onChangeVideoDeviceId={onChangeVideoDeviceId}
            onChangeAudioDeviceId={onChangeAudioDeviceId}
            isVideoTrackMuted={media.isVideoTrackMuted}
            isAudioTrackMuted={media.isAudioTrackMuted}
            onClickToggleVideoMuted={onClickToggleVideoMuted}
            onClickToggleAudioMuted={onClickToggleAudioMuted}
            isReEntering={ui.isReEntering}
            isJoined={room.isJoined}
            isDisplayNameValid={client.isDisplayNameValid}
            onClickCloseSettings={onClickCloseSettings}
            onClickJoinConference={onClickJoinConference}
          />
        );
      }}
    </Observer>
  );
};

export default Settings;
