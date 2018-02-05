import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const SettingVideo = ({ room }) => <Video stream={room.localStream} muted />;

export default observer(SettingVideo);
