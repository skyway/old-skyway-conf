import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';
import bom from './helper/bom';

const ua = navigator.userAgent;
const isSupportedOs = ['Windows', 'Mac'].includes(bom.getOsName(ua));
const isSupportedBrowser = ['Chrome', 'Firefox'].includes(
  bom.getBrowserName(ua)
);
if (isSupportedOs && isSupportedBrowser) {
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
          console.warn(`[action] ${key}`, ...args);
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
