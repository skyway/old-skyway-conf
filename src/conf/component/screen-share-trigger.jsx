import React from 'react';
import { observer } from 'mobx-react';

const ScreenShareTrigger = ({ ui, action }) =>
  !ui.isFirefoxAndScreenShareTriggerNeeded ? (
    <button
      onClick={() => action.startScreenShare()}
      title="Start screen share"
    >
      <i className="material-icons">screen_share</i>
    </button>
  ) : (
    <React.Fragment>
      <button
        onClick={() =>
          action.$update(
            'ui.isScreenShareTriggerOpen',
            !ui.isScreenShareTriggerOpen
          )
        }
        title="Choose screen share media source"
      >
        <i className="material-icons">screen_share</i>
      </button>
      {ui.isScreenShareTriggerOpen && (
        <div className="ScreenShareTrigger_Items">
          <p className="ScreenShareTrigger_Items_Desc">Share your...</p>
          {['window', 'screen', 'application'].map(type => (
            <button
              key={type}
              onClick={() => action.startScreenShare(type)}
              title={`Share ${type}`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </React.Fragment>
  );

export default observer(ScreenShareTrigger);
