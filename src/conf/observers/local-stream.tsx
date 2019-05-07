import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import LocalStreamLayout from "../components/local-stream-layout";
import LocalStreamController from "../components/local-stream-controller";
import { Video } from "../components/video";
import { openSettings, toggleMuted } from "../effects/local-stream";

const LocalStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenSettings = useCallback(openSettings(store), [store]);
  const onClickToggleMuted = useCallback(toggleMuted(store), [store]);

  console.count("LocalStream.render()");

  const { media, client } = store;
  return (
    <LocalStreamLayout
      controller={
        <Observer>
          {() => (
            <LocalStreamController
              dispName={client.displayName}
              browser={client.browserName}
              isVideoDisabled={!media.isUserVideoEnabled}
              isVideoMuted={media.isVideoTrackMuted}
              isAudioMuted={media.isAudioTrackMuted}
              onClickToggleMuted={onClickToggleMuted}
              onClickOpenSettings={onClickOpenSettings}
            />
          )}
        </Observer>
      }
      video={
        <Observer>
          {() => {
            console.count("LocalStream.video.render()");

            return <Video stream={media.stream} isMine={true} />;
          }}
        </Observer>
      }
    />
  );
};

export default LocalStream;
