import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';
import bom from '../shared/util/bom';

(function() {
  const [, roomType, roomName] = location.hash.split('/');
  const os = bom.getOsName(navigator.userAgent);
  const browser = bom.getBrowserName(navigator.userAgent);

  if (
    (['Windows', 'Mac', 'iOS', 'Android'].includes(os) &&
      ['Chrome', 'Firefox', 'Safari'].includes(browser)) === false
  ) {
    location.href = './not_supported.html';
    return;
  }

  // if not mobile, redirect
  if (['iOS', 'Android'].includes(os) === false) {
    location.href = `./conf.html${location.hash}`;
    return;
  }

  // if mobile but iPod, refirect
  if (/iPod/.test(navigator.userAgent)) {
    location.href = './not_supported.html';
    return;
  }

  const store = new ConfStore();
  const action = new ConfAction(store);

  action.onLoad({ roomType, roomName });
  ReactDOM.render(
    <Provider action={action} {...store}>
      <ConfApp />
    </Provider>,
    document.getElementById('app-root')
  );

  window.addEventListener('hashchange', () => location.reload(true));

  // for debug
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
})();
