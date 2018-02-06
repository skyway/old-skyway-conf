import React from 'react';
import { observer } from 'mobx-react';

const DeviceSelector = ({ device, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div>カメラ</div>
      <select
        className="DeviceSelector_Select"
        value={device.videoDeviceId}
        onChange={ev => action.onChangeVideoDevice(ev.target.value)}
      >
        {device.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Video${idx + 1}`}
          </option>
        ))}
      </select>
      <button onClick={() => action.onClickToggleVideoMute()}>
        ミュート{device.isVideoMuted ? '解除' : ''}
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div>マイク</div>
      <select
        className="DeviceSelector_Select"
        value={device.audioDeviceId}
        onChange={ev => action.onChangeAudioDevice(ev.target.value)}
      >
        {device.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Audio${idx + 1}`}
          </option>
        ))}
      </select>
      <button onClick={() => action.onClickToggleAudioMute()}>
        ミュート{device.isAudioMuted ? '解除' : ''}
      </button>
    </div>
  </div>
);

export default observer(DeviceSelector);
