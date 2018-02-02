import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';

import util from '../shared/util';

const [, roomType, roomName] = location.hash.split('/');
if (!util.isValidRoomName(roomName) || !util.isValidRoomType(roomType)) {
  throw new Error(`Invalid roomName or roomType: ${location.hash}`);
}

const store = new ConfStore({ roomType, roomName });
const action = new ConfAction(store);

action.onLoad();
ReactDOM.render(
  <Provider action={action} {...store}>
    <ConfApp />
  </Provider>,
  document.getElementById('app-root')
);
