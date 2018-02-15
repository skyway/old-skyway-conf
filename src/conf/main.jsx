import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import util from '../shared/util';
import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';

const ua = navigator.userAgent;
if (util.supportOs(ua) && util.supportBrowser(ua)) {
  const store = new ConfStore();
  const action = new ConfAction(store);

  const [, roomType, roomName] = location.hash.split('/');
  action.onLoad({ roomType, roomName });
  ReactDOM.render(
    <Provider action={action} {...store}>
      <ConfApp />
    </Provider>,
    document.getElementById('app-root')
  );
} else {
  location.href = '/not_supported.html';
}
