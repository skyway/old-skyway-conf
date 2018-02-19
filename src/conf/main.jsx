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

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.action = action;

    const proto = Object.getPrototypeOf(action);
    Object.getOwnPropertyNames(proto)
      .filter(name => {
        return name !== 'constructor' && typeof proto[name] === 'function';
      })
      .forEach(key => {
        const origMethod = action[key];
        action[key] = (...args) => {
          console.warn(`[action] ${key}`);
          origMethod.call(action, ...args);
        };
      });
  }

  const [, roomType, roomName] = location.hash.split('/');
  action.onLoad({ roomType, roomName });
  ReactDOM.render(
    <Provider action={action} {...store}>
      <ConfApp />
    </Provider>,
    document.getElementById('app-root')
  );
} else {
  location.href = './not_supported.html';
}
