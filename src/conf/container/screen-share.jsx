import React from 'react';
import { observer, inject } from 'mobx-react';

const ScreenShare = ({ ui, action }) =>
  ui.isScreenSharing ? (
    <button onClick={() => action.stopScreenShare()}>
      <i className="material-icons">stop_screen_share</i>
    </button>
  ) : (
    <button onClick={() => action.startScreenShare()}>
      <i className="material-icons">screen_share</i>
    </button>
  );

export default inject('ui', 'action')(observer(ScreenShare));
