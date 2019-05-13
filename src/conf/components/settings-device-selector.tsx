import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

interface Props {
  deviceId: string;
  inDevices: MediaDeviceInfo[];
  onChangeDeviceId: (deviceId: string) => void;
}
const SettingsDeviceSelector: FunctionComponent<Props> = ({
  deviceId,
  inDevices,
  onChangeDeviceId
}: Props) => (
  <select
    value={deviceId || ""}
    onChange={ev => onChangeDeviceId(ev.target.value)}
    css={selectStyle}
  >
    {inDevices.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ))}
  </select>
);

export default SettingsDeviceSelector;

const selectStyle = css({
  boxSizing: "border-box",
  width: "100%",
  fontSize: "1.1rem"
});
