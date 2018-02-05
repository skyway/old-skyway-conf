import React from 'react';
import { observer, inject } from 'mobx-react';

import ScreenVideo from '../component/screen-video';

const Screen = ({ room }) => (
  <div className="L-Screen">
    <ScreenVideo room={room} />
  </div>
);

export default inject('room')(observer(Screen));
