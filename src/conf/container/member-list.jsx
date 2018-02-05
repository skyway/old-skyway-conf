import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

// TODO: optimize render perf
const MemberList = ({ room, action }) => (
  <div className="L-MemberList">
    <div className="L-MemberList_Video">
      <div onClick={() => action.$update('ui.isSettingOpen', true)}>
        <Video store={{ stream: room.localStream }} muted />
      </div>
    </div>
    {room.remoteStreams.slice().map(stream => (
      <div key={stream.id} className="L-MemberList_Video">
        <Video store={{ stream }} />
      </div>
    ))}
  </div>
);

export default inject('device', 'room', 'action')(observer(MemberList));
