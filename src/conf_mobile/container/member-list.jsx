import React from 'react';
import { observer, inject } from 'mobx-react';

import MemberList from '../component/member-list';
import MemberVideoLocal from '../component/member-video/local';
import MemberVideoRemotes from '../component/member-video/remotes';

const MemberListC = ({ room, user, action }) => (
  <MemberList room={room}>
    <MemberVideoLocal user={user} action={action} />
    <MemberVideoRemotes room={room} action={action} />
  </MemberList>
);

export default inject('room', 'user', 'action')(observer(MemberListC));
