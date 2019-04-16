import * as React from 'react';
import { render } from 'react-dom';
import { Global } from '@emotion/core';
import { name, version } from '../../package.json';
import { globalStyle } from '../shared/global-style';
import Logger from '../shared/logger';
import App from './components/app';

const logger = new Logger('index:main');

logger.info(`${name} v${version}`);

render(
  <>
    <Global styles={globalStyle} />
    <App />
  </>,
  document.getElementById('app-root'),
);
