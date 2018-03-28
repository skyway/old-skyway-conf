import React from 'react';
import { observer, inject } from 'mobx-react';

import MemberList from '../component/member-list';
import MemberVideoLocal from '../component/member-video/local';
import MemberVideoRemotes from '../component/member-video/remotes';

const MemberListC = ({ ui, room, user, action }) => (
  <MemberList room={room}>
    <MemberVideoLocal ui={ui} room={room} user={user} action={action} />
    <MemberVideoRemotes room={room} action={action} />
  </MemberList>
);

export default inject('ui', 'room', 'user', 'action')(observer(MemberListC));
