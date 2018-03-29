import React from 'react';
import { observer } from 'mobx-react';

import CamIcon from '../../../shared/component/icon/cam';
import MicIcon from '../../../shared/component/icon/mic';

const MemberVideoLocal = ({ user, action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Local">
      <button
        onClick={() => action.$update('user.isVideoMuted', !user.isVideoMuted)}
        title={user.isVideoMuted ? 'Unmute' : 'Mute'}
      >
        <CamIcon isMuted={user.isVideoMuted} />
      </button>
      <button
        onClick={() => action.$update('user.isAudioMuted', !user.isAudioMuted)}
        title={user.isAudioMuted ? 'Unmute' : 'Mute'}
      >
        <MicIcon isMuted={user.isAudioMuted} />
      </button>
      <button
        onClick={() => action.$update('ui.isSettingOpen', true)}
        title="Open settings"
      >
        <i className="material-icons">settings</i>
      </button>
      <button
        onClick={() => action.$update('ui.isChatOpen', true)}
        title="Open chat"
      >
        <i className="material-icons">chat</i>
      </button>
    </div>
  </div>
);

export default observer(MemberVideoLocal);
