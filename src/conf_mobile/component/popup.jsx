import React from 'react';
import { observer } from 'mobx-react';

const Popup = ({ isVisible, children }) => (
  <div
    className="Popup"
    style={{
      transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 200%, 0)',
    }}
  >
    {children}
  </div>
);

export default observer(Popup);
