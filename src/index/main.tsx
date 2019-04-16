import * as React from 'react';
import { render } from 'react-dom';
import { version } from '../../package.json';
import { Global, css } from '@emotion/core';

const globalStyle = css({
  'html, body': {
    padding: 0,
    margin: 0,
  },
});

const style = css({
  backgroundColor: 'orange',
  boxSizing: 'border-box',
});

const App = () => <div css={style}>v{version}</div>;

render(
  <>
    <Global styles={globalStyle} />
    <App />
  </>,
  document.getElementById('app-root'),
);
