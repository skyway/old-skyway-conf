import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";

const Settings: FunctionComponent<{}> = () => {
  const { ui, client } = useContext(StoreContext);

  return (
    <Observer>
      {() => {
        if (!ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <div css={wrapperStyle}>
            <video />
            <select>
              {client.videoInDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
            <select>
              {client.audioInDevices.map(device => (
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
