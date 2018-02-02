import React from 'react';
import { observer } from 'mobx-react';

const DeviceSelector = ({ peer, action }) => (
  <div className="DeviceSelector">
    <div className="DeviceSelector_Row">
      <div>カメラ</div>
      <select
        className="DeviceSelector_Select"
        value={peer.videoDeviceId}
        onChange={ev => action.onChangeVideoDevice(ev.target.value)}
      >
        {peer.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Video${idx + 1}`}
          </option>
        ))}
      </select>
      <button onClick={() => action.onClickVideoMute()}>
        ミュート{peer.isVideoMuted ? '解除' : ''}
      </button>
    </div>
    <div className="DeviceSelector_Row">
      <div>マイク</div>
      <select
        className="DeviceSelector_Select"
        value={peer.audioDeviceId}
        onChange={ev => action.onChangeAudioDevice(ev.target.value)}
      >
        {peer.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Audio${idx + 1}`}
          </option>
        ))}
      </select>
      <button onClick={() => action.onClickAudioMute()}>
        ミュート{peer.isAudioMuted ? '解除' : ''}
      </button>
    </div>
  </div>
);

export default observer(DeviceSelector);
