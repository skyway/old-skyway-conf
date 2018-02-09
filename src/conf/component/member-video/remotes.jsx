import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';

const MemberVideoRemotes = ({ room, action }) => (
  <React.Fragment>
    {room.remoteStreams.map(stream => {
      const syncState = room.syncState.get(stream.peerId);
      return (
        <div
          key={stream.id}
          className="MemberVideo"
          onClick={() => action.$update('room.pinnedPeerId', stream.peerId)}
        >
          {syncState ? (
            <div className="MemberVideo_Info">
              <div className="MemberVideo_Info_Name">{syncState.dispName}</div>
              {syncState.isVideoMuted && (
                <i className="material-icons">videocam_off</i>
              )}
              {syncState.isAudioMuted && (
                <i className="material-icons">mic_off</i>
              )}
            </div>
          ) : null}
          <Video stream={stream} />
        </div>
      );
    })}
  </React.Fragment>
);

export default observer(MemberVideoRemotes);
