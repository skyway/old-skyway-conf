import React from 'react';
import { observer } from 'mobx-react';

import CamIcon from './icon/cam';
import MicIcon from './icon/mic';

const DeviceSelector = ({ ui, user, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Cam</div>
      <select
        className="DeviceSelector_Select"
        value={user.videoDeviceId}
        onChange={ev => action.$update('user.videoDeviceId', ev.target.value)}
        disabled={ui.isScreenSharing}
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
        <CamIcon isMuted={user.isVideoMuted} />
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Mic</div>
      <select
        className="DeviceSelector_Select"
        value={user.audioDeviceId}
        onChange={ev => action.$update('user.audioDeviceId', ev.target.value)}
        disabled={ui.isScreenSharing}
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
        <MicIcon isMuted={user.isAudioMuted} />
      </button>
    </div>
    {ui.isScreenSharing && (
      <p className="DeviceSelector_Notice">
        You can not change devices during screen sharing.
      </p>
    )}
  </div>
);

export default observer(DeviceSelector);
