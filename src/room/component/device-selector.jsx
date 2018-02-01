import React from 'react';
import { observer } from 'mobx-react';

const DeviceSelector = ({ peer, action }) => (
  <React.Fragment>
    <select
      value={peer.videoDeviceId}
      onChange={ev => action.onChangeVideoDevice(ev.target.value)}
    >
      {peer.videoDevices.map((device, idx) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `Video${idx + 1}`}
        </option>
      ))}
    </select>
    <select
      value={peer.audioDeviceId}
      onChange={ev => action.onChangeAudioDevice(ev.target.value)}
    >
      {peer.audioDevices.map((device, idx) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `Audio${idx + 1}`}
        </option>
      ))}
    </select>
  </React.Fragment>
);

export default observer(DeviceSelector);
