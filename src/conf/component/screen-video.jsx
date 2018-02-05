import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const ScreenVideo = ({ room }) => <Video stream={room.pinnedStream} muted />;

export default observer(ScreenVideo);
