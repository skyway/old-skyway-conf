import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";
import Video from "../components/video";
import { enableVideo } from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickEnableVideo = useCallback(enableVideo(store), [store]);

  console.count("Settings.render()");

  const { ui, media } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        console.count("Settings.Observer.render()");

        return (
          <div css={wrapperStyle}>
            <div>
              <Video stream={media.stream} />
            </div>
            <div>
              {media.isUserVideoEnabled ? (
                <select
                  value={media.videoDeviceId || ""}
                  onChange={ev => (media.videoDeviceId = ev.target.value)}
                >
                  {media.videoInDevices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              ) : (
                <button onClick={onClickEnableVideo}>enable video</button>
              )}
            </div>
            <div>
              <select
                value={media.audioDeviceId || ""}
                onChange={ev => (media.audioDeviceId = ev.target.value)}
              >
                {media.audioInDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            </div>
            <button>OK</button>
          </div>
        );
      }}
    </Observer>
  );
};

export default Settings;

const wrapperStyle = css({
  position: "absolute",
  backgroundColor: globalColors.white
});
