import * as React from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/core';
import { name, version } from '../../package.json';
import { globalStyle } from '../shared/global-style';
import { isValidRoomName, isValidRoomType } from '../shared/validate';
import { createLogger } from '../shared/logger';
import App from './components/app';

const logger = createLogger('conf:main');

(async function() {
  logger.info(`${name} v${version}`);

  const [, roomType, roomName] = location.hash.split('/');
  if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
    logger.error('TODO: show error view');
  }

  render(
    <>
      <Global styles={globalStyle} />
      <App />
    </>,
    document.getElementById('app-root'),
  );
})().catch(err => logger.error(err));
