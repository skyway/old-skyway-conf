import React from 'react';
import { observer } from 'mobx-react';

import CamIcon from '../../shared/component/icon/cam';
import MicIcon from '../../shared/component/icon/mic';
import VaIcon from '../../shared/component/icon/va';

const DeviceSelector = ({ ui, user, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Cam</div>
      <select
        className="DeviceSelector_Select"
        value={user.videoDeviceId}
        onChange={ev => action.$update('user.videoDeviceId', ev.target.value)}
        disabled={ui.isScreenSharing || user.isNoVideoDevices}
      >
        {user.isNoVideoDevices && <option value="">Cam not found</option>}
        {user.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Cam ${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
        title={user.isVideoMuted ? 'Unmute' : 'Mute'}
      >
        <CamIcon isMuted={user.isVideoMuted} isSelf />
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div className="DeviceSelector_Label">Mic</div>
      <select
        className="DeviceSelector_Select"
        value={user.audioDeviceId}
        onChange={ev => action.$update('user.audioDeviceId', ev.target.value)}
        disabled={ui.isScreenSharing || user.isNoAudioDevices}
      >
        {user.isNoAudioDevices && <option value="">Mic not found</option>}
        {user.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Mic ${idx + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
        title={user.isAudioMuted ? 'Unmute' : 'Mute'}
      >
        <MicIcon isMuted={user.isAudioMuted} isSelf />
      </button>
      <div className="DeviceSelector_Va">
        <VaIcon isSpeaking={user.isSpeaking} />
      </div>
    </div>
    {ui.isScreenSharing && (
      <p className="DeviceSelector_Notice">
        You can not change devices during screen sharing.
      </p>
    )}
  </div>
);

export default observer(DeviceSelector);
