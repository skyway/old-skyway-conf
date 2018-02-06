import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';

const MemberVideoRemotes = ({ room, action }) => (
  <React.Fragment>
    {room.remoteStreams.slice().map(stream => (
      <div
        key={stream.id}
        className="MemberVideo"
        onClick={() => action.$update('room.pinnedPeerId', stream.peerId)}
      >
        <Video stream={stream} />
      </div>
    ))}
  </React.Fragment>
);

export default observer(MemberVideoRemotes);
