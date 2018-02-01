import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

const Prepare = ({ peer, action }) => (
  <React.Fragment>
    <Video peer={peer} muted />

    <div>
      <select onChange={ev => action.onChangeVideoDevice(ev.target.value)}>
        {peer.videoDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Video${idx + 1}`}
          </option>
        ))}
      </select>
      <select onChange={ev => action.onChangeAudioDevice(ev.target.value)}>
        {peer.audioDevices.map((device, idx) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Audio${idx + 1}`}
          </option>
        ))}
      </select>
    </div>

    <div>
      <button onClick={() => action.onClickVideoMute()}>カメラミュート</button>
      <button onClick={() => action.onClickAudioMute()}>マイクミュート</button>
    </div>

    <button onClick={() => action.onClickJoinRoom()}>参加する</button>
  </React.Fragment>
);

export default inject('peer', 'action')(observer(Prepare));
