import React from 'react';
import { observer } from 'mobx-react';

const Popup = ({ isVisible, children }) => (
  <div
    className="Popup"
    style={{
      transform: isVisible
        ? 'translate3d(0, 0, 0)'
        : 'translate3d(0, -100%, 0)',
      visibility: isVisible ? 'visible' : 'hidden',
    }}
  >
    {children}
  </div>
);

export default observer(Popup);
