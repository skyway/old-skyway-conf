import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import LocalStreamLayout from "../components/local-stream-layout";
import LocalStreamController from "../components/local-stream-controller";
import Video from "../components/video";
import {
  openSettings,
  toggleAudioMuted,
  toggleVideoMuted
} from "../effects/local-stream";

const LocalStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenSettings = useCallback(openSettings(store), [store]);
  const onClickToggleAudioMuted = useCallback(toggleAudioMuted(store), [store]);
  const onClickToggleVideoMuted = useCallback(toggleVideoMuted(store), [store]);

  const { media, client } = store;
  return (
    <LocalStreamLayout
      controller={
        <Observer>
          {() => (
            <LocalStreamController
              displayName={client.displayName}
              isVideoDisabled={!media.isUserVideoEnabled}
              isVideoMuted={media.isVideoTrackMuted}
              isAudioMuted={media.isAudioTrackMuted}
              onClickToggleAudioMuted={onClickToggleAudioMuted}
              onClickToggleVideoMuted={onClickToggleVideoMuted}
              onClickOpenSettings={onClickOpenSettings}
            />
          )}
        </Observer>
      }
      video={
        <Observer>
          {() => <Video stream={media.stream} isMine={true} />}
        </Observer>
      }
    />
  );
};

export default LocalStream;
