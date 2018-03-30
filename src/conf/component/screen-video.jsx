import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const ScreenVideo = ({ room }) => (
  <div className="ScreenVideo">
    {room.pinnedStream ? <Video stream={room.pinnedStream} muted /> : null}
  </div>
);

export default observer(ScreenVideo);
