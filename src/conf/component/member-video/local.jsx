import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';
import CamIcon from '../../../shared/component/icon/cam';
import MicIcon from '../../../shared/component/icon/mic';

const MemberVideoLocal = ({ ui, room, user, action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Name">{user.dispName}</div>
    <div className="MemberVideo_Control">
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
        title={user.isAudioMuted ? 'Unmute' : 'Mute'}
      >
        <MicIcon isMuted={user.isAudioMuted} isSelf />
      </button>
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
        title={user.isVideoMuted ? 'Unmute' : 'Mute'}
      >
        <CamIcon isMuted={user.isVideoMuted} isSelf />
      </button>
    </div>
    <div className="MemberVideo_Settings">
      <button
        onClick={() => action.$update('ui.isSettingOpen', true)}
        title="Open settings"
      >
        <i className="material-icons">settings</i>
      </button>
    </div>
    <Video
      stream={room.localStream}
      muted
      isMirror={ui.isScreenSharing === false}
    />
  </div>
);

export default observer(MemberVideoLocal);
