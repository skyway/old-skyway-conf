import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';

const ScreenShareIntro = ({ ui, action }) => (
  <Popup isVisible={ui.isScreenShareIntroOpen}>
    <div className="L-ScreenShareIntro">
      <h3 className="L-ScreenShareIntro_Title">ScreenShare is not available</h3>
      <p className="L-ScreenShareIntro_Desc">
        Screen share is not supported on your browser. If you are using Chrome,
        please install{' '}
        <a
          href="https://chrome.google.com/webstore/detail/conf3-screenshare/ooeacgahemnciocfilnkchjjiakipakp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chrome extension
        </a>
        .
      </p>
      <p className="L-ScreenShareIntro_Desc">
        Or, try latest browser releases like Chrome Canary, Safari TP may
        support screen share.
      </p>
      <div className="L-ScreenShareIntro_Finish">
        <button
          onClick={() => action.$update('ui.isScreenShareIntroOpen', false)}
        >
          Close
        </button>
      </div>
    </div>
  </Popup>
);

export default inject('ui', 'action')(observer(ScreenShareIntro));
