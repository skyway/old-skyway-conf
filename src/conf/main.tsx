import * as React from "react";
import { render } from "react-dom";
import { Global } from "@emotion/core";
import debug from "debug";
import { name, version } from "../../package.json";
import { globalStyle } from "../shared/global-style";
import App from "./app";

const log = debug("conf:main");

(async function() {
  log(`${name} v${version}`);

  render(
    <>
      <Global styles={globalStyle} />
      <App />
    </>,
    document.getElementById("app-root")
  );
})().catch(err => console.error(err));
