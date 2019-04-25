import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";
import Video from "../components/video";
import { getAudioDevices } from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  useEffect(getAudioDevices(store), [store]);

  console.count("Settings.render()");

  const { ui, media } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <div css={wrapperStyle}>
            <div>
              <Video stream={media.stream} />
            </div>
            <select
              value={media.videoDeviceId}
              onChange={ev => (media.videoDeviceId = ev.target.value)}
            >
              {media.videoInDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
            <select
              value={media.audioDeviceId}
              onChange={ev => (media.audioDeviceId = ev.target.value)}
            >
              {media.audioInDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
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
