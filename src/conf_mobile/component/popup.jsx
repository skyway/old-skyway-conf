import React from 'react';
import { observer } from 'mobx-react';

const Popup = ({ isVisible, children }) =>
  isVisible ? <div className="Popup">{children}</div> : null;

export default observer(Popup);
