import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const MemberVideoLocal = ({ room, action }) => (
  <div
    className="MemberVideo"
    onClick={() => action.$update('ui.isSettingOpen', true)}
  >
    <Video stream={room.localStream} muted />
  </div>
);

export default observer(MemberVideoLocal);
