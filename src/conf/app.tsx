import * as React from "react";
import { Observer } from "mobx-react";
import { useContext, useEffect, FunctionComponent } from "react";
import { css } from "@emotion/core";
import { StoreContext, ActionContext } from "./contexts";

const App: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);
  const action = useContext(ActionContext);

  useEffect(() => action.onLoad(), [action]);

  return (
    <Observer>
      {() => {
        if (store.ui.error !== null) {
          return <p>{store.ui.error.toString()}</p>;
        }

        return (
          <div css={wrapperStyle}>
            <img src="./images/conf/icon-loading.svg" />
          </div>
        );
      }}
    </Observer>
  );
};

export default App;

const wrapperStyle = css({
  height: "100vh",
  position: "relative"
});
