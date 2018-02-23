import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const SettingVideo = ({ ui, room }) => (
  <Video
    stream={room.localStream}
    muted
    isMirror={ui.isScreenSharing === false}
  />
);

export default observer(SettingVideo);
