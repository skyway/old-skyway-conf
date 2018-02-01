import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import RoomStore from './store';
import RoomAction from './action';
import Layout from './layout';

import util from '../shared/util';

const [, roomType, roomName] = location.hash.split('/');
if (!util.isValidRoomName(roomName) || !util.isValidRoomType(roomType)) {
  throw new Error(`Invalid roomName or roomType: ${location.hash}`);
}

const store = new RoomStore({ roomType, roomName });
const action = new RoomAction(store);

action.onLoad();
ReactDOM.render(
  <Provider action={action}>
    <Layout store={store} />
  </Provider>,
  document.getElementById('app-root')
);
