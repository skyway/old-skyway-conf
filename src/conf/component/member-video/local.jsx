import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';

const MemberVideoLocal = ({ room, action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Info">
      <div className="MemberVideo_Info_Name">{room.localName}</div>
      <button
        onClick={() => action.onClickToggleVideoMute()}
      >
        x
      </button>
      <button
        onClick={() => action.onClickToggleAudioMute()}
      >
        x
      </button>
      <button
        onClick={() => action.$update('ui.isSettingOpen', true)}
      >
        設定
      </button>
    </div>
    <Video stream={room.localStream} muted />
  </div>
);

export default observer(MemberVideoLocal);
