import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "./contexts";
import { onAppLoad, onDeviceChange } from "./actions";

const App: FunctionComponent<{}> = () => {
  const { ui, client } = useContext(StoreContext);

  useEffect(() => {
    onAppLoad({ ui, client });
  });
  useEffect(onDeviceChange({ ui, client }));

  return (
    <Observer>
      {() => {
        if (ui.error instanceof Error) {
          return <p>{ui.error.toString()}</p>;
        }

        if (!client.isReady) {
          return (
            <div css={wrapperStyle}>
              <img src="./images/conf/icon-loading.svg" />
            </div>
          );
        }

        return <div>OK</div>;
      }}
    </Observer>
  );
};

export default App;

const wrapperStyle = css({
  height: "100vh",
  position: "relative"
});
