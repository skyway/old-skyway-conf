import React from 'react';
import { observer } from 'mobx-react';

import Video from '../video';
import CamIcon from '../../../shared/component/icon/cam';
import MicIcon from '../../../shared/component/icon/mic';
import VaIcon from '../../../shared/component/icon/va';

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
          {room.pinnedPeerIdDisp === stream.peerId && (
            <div className="MemberVideo_Pinned" />
          )}
          {syncState ? (
            <React.Fragment>
              <div className="MemberVideo_Name">{syncState.dispName}</div>
              <div className="MemberVideo_Media">
                {syncState.isVideoMuted && <CamIcon isMuted={true} />}
                {syncState.isAudioMuted && <MicIcon isMuted={true} />}
                {syncState.isSpeaking && <VaIcon isSpeaking={true} />}
              </div>
            </React.Fragment>
          ) : null}
          <Video stream={stream} />
        </div>
      );
    })}
  </React.Fragment>
);

export default observer(MemberVideoRemotes);
