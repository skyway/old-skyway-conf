import { css } from '@emotion/core';

export const globalColors = {
  blue: '#005ece',
  lightblue: '#039be5',
  red: '#ff6673',
  gray: '#eee',
  white: '#fff',
  black: '#111',
};

export const globalStyle = css({
  html: {
    WebkitFontSmoothing: 'antialiased',
  },
  body: {
    margin: 0,
    fontSize: 16,
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'lighter',
    lineHeight: 1.5,
    height: '100vh',
    backgroundColor: globalColors.blue,
  },
  'body > div': {
    height: '100vh',
    overflow: 'hidden',
  },
});
