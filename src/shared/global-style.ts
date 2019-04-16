// tslint:disable:object-literal-key-quotes
import { css } from '@emotion/core';

export const globalStyle = css({
  html: {
    '-webkitFontSmoothing': 'antialiased',
  },
  body: {
    margin: 0,
    fontSize: 16,
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'lighter',
    lineHeight: 1.5,
    height: '100vh',
    backgroundColor: '#005ece',
  },
  'body > div': {
    height: '100vh',
    overflow: 'hidden',
  },
});
