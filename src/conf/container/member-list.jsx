import React from 'react';
import { observer, inject } from 'mobx-react';

import MemberVideo from '../component/member-video';

const MemberList = ({ room, action }) => (
  <div className="L-MemberList">
    <MemberVideo.LocalVideo room={room} action={action} />
    <MemberVideo.RemoteVideos room={room} />
  </div>
);

export default inject('room', 'action')(observer(MemberList));
