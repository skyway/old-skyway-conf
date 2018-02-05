import React from 'react';
import { observer, inject } from 'mobx-react';

import ScreenVideo from '../component/screen-video';

const Screen = ({ room }) => <ScreenVideo room={room} />;

export default inject('room')(observer(Screen));
