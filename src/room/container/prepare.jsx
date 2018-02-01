import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';
import DeviceSelector from '../component/device-selector';

const Prepare = ({ peer, action }) => (
  <React.Fragment>
    <Video peer={peer} muted />

    <DeviceSelector peer={peer} action={action} />

    <div>
      <button onClick={() => action.onClickVideoMute()}>
        カメラミュート{peer.isVideoMuted ? '解除' : ''}
      </button>
      <button onClick={() => action.onClickAudioMute()}>
        マイクミュート{peer.isAudioMuted ? '解除' : ''}
      </button>
    </div>

    <button onClick={() => action.onClickJoinRoom()}>参加する</button>
  </React.Fragment>
);

export default inject('peer', 'action')(observer(Prepare));
