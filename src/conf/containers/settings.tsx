import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";
import Video from "../components/video";
import DeviceSelector from "../components/device-selector";
import { enableVideo, changeDeviceId } from "../effects/settings";

const Settings: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickEnableVideo = useCallback(enableVideo(store), [store]);
  const onChangeDeviceId = useCallback(changeDeviceId(store), [store]);

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
                <DeviceSelector
                  deviceId={media.videoDeviceId || ""}
                  inDevices={media.videoInDevices}
                  onChangeDeviceId={deviceId =>
                    onChangeDeviceId("video", deviceId)
                  }
                />
              ) : (
                <button onClick={onClickEnableVideo}>enable video</button>
              )}
            </div>
            <div>
              <DeviceSelector
                deviceId={media.audioDeviceId || ""}
                inDevices={media.audioInDevices}
                onChangeDeviceId={deviceId =>
                  onChangeDeviceId("audio", deviceId)
                }
              />
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
