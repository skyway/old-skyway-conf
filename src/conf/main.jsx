import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';

const store = new ConfStore();
const action = new ConfAction(store);

// TODO: for debug
window.store = store;
window.action = action;

const [, roomType, roomName] = location.hash.split('/');
action.onLoad({ roomType, roomName });
ReactDOM.render(
  <Provider action={action} {...store}>
    <ConfApp />
  </Provider>,
  document.getElementById('app-root')
);
