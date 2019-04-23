import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import Bootstrap from "./containers/bootstrap";

const App: FunctionComponent<{}> = () => {
  return (
    <Bootstrap>
      <div css={wrapperStyle}>APP</div>
    </Bootstrap>
  );
};

export default App;

const wrapperStyle = css({});
