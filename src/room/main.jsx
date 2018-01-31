import React from 'react';
import ReactDOM from 'react-dom';
import Peer from 'skyway-js';

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

const peer = new Peer({
  key: '03ff6219-b58f-4310-9484-e9108e859cdd',
  debug: 2,
});

peer.on('open', peerId => {
  console.log(peerId);
});

ReactDOM.render(
  <Layout store={store} action={action} />,
  document.getElementById('app-root')
);
