import React from 'react';
import { observer } from 'mobx-react';

const DeviceSelector = ({ user, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Cam</div>
      <select
        className="DeviceSelector_Select"
        value={user.videoDeviceId}
        onChange={ev => action.$update('user.videoDeviceId', ev.target.value)}
      >
        {user.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Cam ${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
      >
        {user.isVideoMuted ? (
          <i className="material-icons">videocam</i>
        ) : (
          <i className="material-icons">videocam_off</i>
        )}
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Mic</div>
      <select
        className="DeviceSelector_Select"
        value={user.audioDeviceId}
        onChange={ev => action.$update('user.audioDeviceId', ev.target.value)}
      >
        {user.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Mic ${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
      >
        {user.isAudioMuted ? (
          <i className="material-icons">mic</i>
        ) : (
          <i className="material-icons">mic_off</i>
        )}
      </button>
    </div>
  </div>
);

export default observer(DeviceSelector);
