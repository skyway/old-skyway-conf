import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const ScreenVideo = ({ room }) => (
  <div className="ScreenVideo">
    <Video stream={room.pinnedStream} muted />
  </div>
);

export default observer(ScreenVideo);
