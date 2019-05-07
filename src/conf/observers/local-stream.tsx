import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import LocalStreamLayout from "../components/local-stream-layout";
import { Video } from "../components/video";
import { openSettings } from "../effects/local-stream";

const LocalStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenSettings = useCallback(openSettings(store), [store]);

  console.count("LocalStream.render()");

  const { media, client } = store;
  return (
    <LocalStreamLayout
      onClickOpenSettings={onClickOpenSettings}
      meta={
        <Observer>
          {() => {
            console.count("LocalStream.meta.render()");

            return (
              <div style={{ color: "white" }}>
                {client.displayName}
                <div>
                  v:{media.isVideoTrackMuted ? "x" : "o"}
                  {" / "}
                  a:{media.isAudioTrackMuted ? "x" : "o"}
                </div>
              </div>
            );
          }}
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
