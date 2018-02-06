import React from 'react';
import { observer } from 'mobx-react';

const DeviceSelector = ({ user, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div>カメラ</div>
      <select
        className="DeviceSelector_Select"
        value={user.videoDeviceId}
        onChange={ev => action.$update('user.videoDeviceId', ev.target.value)}
      >
        {user.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Video${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
      >
        ミュート{user.isVideoMuted ? '解除' : ''}
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div>マイク</div>
      <select
        className="DeviceSelector_Select"
        value={user.audioDeviceId}
        onChange={ev => action.$update('user.audioDeviceId', ev.target.value)}
      >
        {user.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Audio${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
      >
        ミュート{user.isAudioMuted ? '解除' : ''}
      </button>
    </div>
  </div>
);

export default observer(DeviceSelector);
