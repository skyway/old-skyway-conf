import React from 'react';
import { observer } from 'mobx-react';

const Error = ({ ui }) => (
  <div className="Error">
    <div className="Error_Title">
      <i className="material-icons">error</i>
      <span>Error</span>
    </div>

    {ui.isUserError && (
      <div className="Error_Desc">
        <p>Please check your..</p>
        <ul>
          <li>current url(and hash)</li>
          <li>camera or microphone settings</li>
          <li>network conditions</li>
          <li>browser updates</li>
        </ul>
      </div>
    )}
    {ui.isAppError && (
      <div className="Error_Desc">
        <p>
          Sorry, currently our service is not available. Please try it later.
        </p>
      </div>
    )}
  </div>
);

export default observer(Error);
