import React from 'react';
import { observer } from 'mobx-react';

const MemberVideoInvite = ({ action }) => (
  <div className="MemberVideo">
    <div className="MemberVideo_Invite">
      <button onClick={() => action.$update('ui.isInviteOpen', true)}>
        Invite people!
      </button>
    </div>
  </div>
);

export default observer(MemberVideoInvite);
