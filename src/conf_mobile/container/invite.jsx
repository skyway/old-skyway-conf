import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';

const Invite = ({ ui, action }) => (
  <Popup isVisible={ui.isInviteOpen}>
    <div className="L-Invite">
      <h3 className="L-Invite_Title">Share the link</h3>
      <input
        type="text"
        className="L-Invite_Input"
        readOnly
        defaultValue={ui.confUrl}
        onClick={ev => ev.target.select(0, -1)}
      />
      <div className="L-Invite_Finish">
        <button onClick={() => action.$update('ui.isInviteOpen', false)}>
          Close
        </button>
      </div>
    </div>
  </Popup>
);

export default inject('ui', 'action')(observer(Invite));
