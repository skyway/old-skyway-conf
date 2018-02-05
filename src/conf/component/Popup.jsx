import React from 'react';
import { observer } from 'mobx-react';

const Popup = ({ children }) => <div className="Popup">{children}</div>;

export default observer(Popup);
