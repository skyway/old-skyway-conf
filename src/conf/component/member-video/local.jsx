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
        {user.isVideoMuted ? (
          <i className="material-icons">videocam</i>
        ) : (
          <i className="material-icons">videocam_off</i>
        )}
      </button>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
      >
        {user.isAudioMuted ? (
          <i className="material-icons">mic</i>
        ) : (
          <i className="material-icons">mic_off</i>
        )}
      </button>
      <button onClick={() => action.$update('ui.isSettingOpen', true)}>
        <i className="material-icons">settings</i>
      </button>
    </div>
    <Video stream={room.localStream} muted />
  </div>
);

export default observer(MemberVideoLocal);
