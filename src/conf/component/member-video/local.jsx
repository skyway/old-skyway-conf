import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';
import CamIcon from '../icon/cam';
import MicIcon from '../icon/mic';

const MemberVideoLocal = ({ room, user, action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Info">
      <div className="MemberVideo_Info_Name">{user.dispName}</div>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
      >
        <CamIcon isMuted={user.isVideoMuted} />
      </button>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
      >
        <MicIcon isMuted={user.isAudioMuted} />
      </button>
      <button onClick={() => action.$update('ui.isSettingOpen', true)}>
        <i className="material-icons">settings</i>
      </button>
    </div>
    <Video stream={room.localStream} muted />
  </div>
);

export default observer(MemberVideoLocal);
