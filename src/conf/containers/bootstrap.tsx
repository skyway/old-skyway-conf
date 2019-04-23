import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent, ReactNode } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "../contexts";
import { onAppLoad, onDeviceChange } from "../actions";

interface Props {
  children: ReactNode;
}
const Bootstrap: FunctionComponent<Props> = ({ children }) => {
  const { ui, client } = useContext(StoreContext);

  useEffect(() => {
    // do not return async
    onAppLoad({ ui, client });
  });
  useEffect(() => onDeviceChange({ ui, client }));

  return (
    <Observer>
      {() => {
        if (ui.error instanceof Error) {
          return <p>TODO: {ui.error.toString()}</p>;
        }

        if (!client.isReady) {
          return (
            <div css={wrapperStyle}>
              <img src="./images/conf/icon-loading.svg" />
            </div>
          );
        }

        return <>{children}</>;
      }}
    </Observer>
  );
};

export default Bootstrap;

const wrapperStyle = css({
  height: "100vh",
  position: "relative"
});
