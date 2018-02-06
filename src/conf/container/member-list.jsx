import React from 'react';
import { observer, inject } from 'mobx-react';

import MemberVideoLocal from '../component/member-video/local';
import MemberVideoRemotes from '../component/member-video/remotes';

const MemberList = ({ room, action }) => (
  <div className="L-MemberList">
    <MemberVideoLocal room={room} action={action} />
    <MemberVideoRemotes room={room} action={action} />
  </div>
);

export default inject('room', 'action')(observer(MemberList));
