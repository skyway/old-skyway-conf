import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ConfStore from './store';
import ConfAction from './action';
import ConfApp from './app';
import bom from '../shared/util/bom';
import webrtc from '../shared/util/webrtc';

(function() {
  const [, roomType, roomName] = location.hash.split('/');
  const { userAgent } = navigator;
  const os = bom.getOsName(userAgent);
  const browser = bom.getBrowserName(userAgent);

  if (
    (['Windows', 'Mac', 'Linux', 'iOS', 'Android'].includes(os) &&
      ['Chrome', 'Firefox', 'Safari'].includes(browser)) === false
  ) {
    location.href = './not_supported.html';
    return;
  }

  // if supported, but mobile, redirect
  if (['iOS', 'Android'].includes(os)) {
    location.href = `./conf_mobile.html${location.hash}`;
    return;
  }

  const store = new ConfStore();
  const action = new ConfAction(store);

  // need to select window or screen or ... w/o getDisplayMedia()
  const isFirefoxAndScreenShareTriggerNeeded =
    browser === 'Firefox' && webrtc.isGetDisplayMediaAvailable() === false;
  action.onLoad({ roomType, roomName, isFirefoxAndScreenShareTriggerNeeded });
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
