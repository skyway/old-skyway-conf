import { css, keyframes } from "@emotion/core";

export const fontSize = 16;

export const globalColors = {
  blue: "#005ece",
  lightblue: "#039be5",
  red: "#ff6673",
  gray: "#eee",
  white: "#fff",
  black: "#111"
};

const blink = keyframes`
    0% { opacity: 0 }
   50% { opacity: 0 }
   51% { opacity: 1 }
  100% { opacity: 1 }
`;

export const animation = { blink };

export const globalStyle = css({
  html: {
    WebkitFontSmoothing: "antialiased"
  },
  body: {
    margin: 0,
    fontSize,
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: "lighter",
    lineHeight: 1.5,
    height: "100vh",
    background: `linear-gradient(45deg, ${globalColors.lightblue}, ${globalColors.blue})`
  },
  "body > div": {
    height: "100vh",
    overflow: "hidden"
  }
});
