import * as React from "react";
import { render } from "react-dom";
import { Global } from "@emotion/core";
import { name, version } from "../../package.json";
import { globalStyle } from "../shared/global-style";
import { createLogger } from "../shared/logger";
import App from "./app";

const logger = createLogger("index:main");

(async function() {
  logger.info(`${name} v${version}`);

  render(
    <>
      <Global styles={globalStyle} />
      <App />
    </>,
    document.getElementById("app-root")
  );
})().catch(err => logger.error(err));
