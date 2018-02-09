import React from 'react';
import { observer } from 'mobx-react';

const MemberVideoInvite = ({ action }) => (
  <div className="MemberVideo">
    <a
      className="MemberVideo_Invite"
      onClick={() => action.$update('ui.isInviteOpen', true)}
    >
      <i className="material-icons -x2">person_add</i>
    </a>
  </div>
);

export default observer(MemberVideoInvite);
