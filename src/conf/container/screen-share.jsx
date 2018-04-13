import React from 'react';
import { observer, inject } from 'mobx-react';

import ScreenShareTrigger from '../component/screen-share-trigger';

const ScreenShare = ({ ui, action }) =>
  ui.isScreenSharing ? (
    <button onClick={() => action.stopScreenShare()} title="Stop screen share">
      <i className="material-icons">stop_screen_share</i>
    </button>
  ) : (
    <ScreenShareTrigger ui={ui} action={action} />
  );

export default inject('ui', 'action')(observer(ScreenShare));
