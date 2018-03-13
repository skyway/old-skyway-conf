import React from 'react';
import { observer, inject } from 'mobx-react';

const ScreenShare = ({ ui, action }) =>
  ui.isScreenSharing ? (
    <button onClick={() => action.stopScreenShare()} title="Stop screen share">
      <i className="material-icons">stop_screen_share</i>
    </button>
  ) : (
    <button
      onClick={() => action.startScreenShare()}
      title="Start screen share"
    >
      <i className="material-icons">screen_share</i>
    </button>
  );

export default inject('ui', 'action')(observer(ScreenShare));
