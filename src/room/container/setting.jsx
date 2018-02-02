import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';
import DeviceSelector from '../component/device-selector';

const Setting = ({ peer, ui, action }) =>
  ui.isSetting ? (
    <React.Fragment>
      <div className="L-Popup">
        <div className="Setting">
          <div className="Setting_Video">
            <Video peer={peer} muted />
          </div>

          <div>
            <DeviceSelector peer={peer} action={action} />
            <button onClick={() => action.onClickVideoMute()}>
              カメラミュート{peer.isVideoMuted ? '解除' : ''}
            </button>
            <button onClick={() => action.onClickAudioMute()}>
              マイクミュート{peer.isAudioMuted ? '解除' : ''}
            </button>
          </div>

          <label>
            <span>表示名:</span>
            <input type="text" />
          </label>

          <div>
            <button onClick={() => action.onClickJoinRoom()}>設定完了</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;

export default inject('peer', 'ui', 'action')(observer(Setting));
