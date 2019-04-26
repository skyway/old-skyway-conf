import * as React from "react";
import { FunctionComponent } from "react";

interface Props {
  deviceId: string;
  inDevices: MediaDeviceInfo[];
  onChangeDeviceId: (deviceId: string) => void;
}
const DeviceSelector: FunctionComponent<Props> = ({
  deviceId,
  inDevices,
  onChangeDeviceId
}: Props) => (
  <select
    value={deviceId || ""}
    onChange={ev => onChangeDeviceId(ev.target.value)}
  >
    {inDevices.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ))}
  </select>
);

export default DeviceSelector;
