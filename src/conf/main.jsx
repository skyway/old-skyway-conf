import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import util from '../shared/util';
import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';

const ua = navigator.userAgent;
if (util.isSupportedEnv(ua)) {
  const store = new ConfStore();
  const action = new ConfAction(store);

  const [, roomType, roomName] = location.hash.split('/');
  const env = {
    os: util.getOsName(ua),
    browser: util.getBrowserName(ua),
  };
  action.onLoad({ roomType, roomName, env });
  ReactDOM.render(
    <Provider action={action} {...store}>
      <ConfApp />
    </Provider>,
    document.getElementById('app-root')
  );
} else {
  location.href = './not_supported.html';
}
