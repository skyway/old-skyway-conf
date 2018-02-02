import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

// TODO: optimize render perf
const MemberList = ({ self, room, action }) => (
  <div className="L-MemberList">
    <div className="L-MemberList_Video">
      <div onClick={() => action.$update('ui.isSettingOpen', true)}>
        <Video store={self} muted />
      </div>
    </div>
    {room.streams.slice().map(stream => (
      <div key={stream.id} className="L-MemberList_Video">
        <Video store={{ stream }} />
      </div>
    ))}
  </div>
);

export default inject('self', 'room', 'action')(observer(MemberList));
