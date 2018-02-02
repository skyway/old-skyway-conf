import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

// TODO: optimize render perf
const MemberList = ({ self, room }) => (
  <div className="L-MemberList">
    <div className="L-MemberList_Video">
      <Video store={self} muted />
    </div>
    {room.streams.slice().map(stream => (
      <div key={stream.peerId} className="L-MemberList_Video">
        <Video store={{ stream }} />
      </div>
    ))}
  </div>
);

export default inject('self', 'room', 'action')(observer(MemberList));
