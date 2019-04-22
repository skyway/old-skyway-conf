import * as React from "react";
import { css } from "@emotion/core";

export default function App() {
  return (
    <div css={wrapperStyle}>
      <img src="./images/conf/icon-loading.svg" />
    </div>
  );
}

const wrapperStyle = css({
  height: "100vh",
  position: "relative"
});
