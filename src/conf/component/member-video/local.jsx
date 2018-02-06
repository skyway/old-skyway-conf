import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';

const MemberVideoLocal = ({ room, user, action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Info">
      <div className="MemberVideo_Info_Name">{user.dispName}</div>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
      >
        x
      </button>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
      >
        x
      </button>
      <button onClick={() => action.$update('ui.isSettingOpen', true)}>
        設定
      </button>
    </div>
    <Video stream={room.localStream} muted />
  </div>
);

export default observer(MemberVideoLocal);
