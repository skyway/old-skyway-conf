import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import LocalStreamLayout from "../components/local-stream-layout";
import { Video } from "../components/video";

const LocalStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  console.count("LocalStream.render()");

  const { media, client, ui } = store;
  return (
    <LocalStreamLayout
      controller={
        <Observer>
          {() => {
            console.count("LocalStream.controller.render()");

            return <button onClick={() => (ui.isSettingsOpen = true)} />;
          }}
        </Observer>
      }
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
