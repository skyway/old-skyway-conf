import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';

const Welcome = ({ ui, action }) => (
  <Popup isVisible={ui.isWelcomeOpen} noAnim={true}>
    <div className="L-Welcome">
      <h3 className="L-Welcome_Header">SkyWayConferenceMobile</h3>
      <p className="L-Welcome_Messages">
        This site plays sound.
        <br />
        And this site uses your camera and microphone until closing tab.
      </p>
      <div className="L-Welcome_Finish">
        <button onClick={() => action.onClickWelcomeClose()}>OK</button>
      </div>
    </div>
  </Popup>
);

export default inject('ui', 'action')(observer(Welcome));
