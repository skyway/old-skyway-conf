import React from 'react';
import { observer, inject } from 'mobx-react';

import MemberVideoLocal from '../component/member-video/local';
import MemberVideoRemotes from '../component/member-video/remotes';
import MemberVideoInvite from '../component/member-video/invite';

const MemberList = ({ ui, room, user, action }) => (
  <div className="L-MemberList">
    <MemberVideoLocal ui={ui} room={room} user={user} action={action} />
    <MemberVideoRemotes room={room} action={action} />
    <MemberVideoInvite action={action} />
  </div>
);

export default inject('ui', 'room', 'user', 'action')(observer(MemberList));
