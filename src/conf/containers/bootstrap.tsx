import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent, ReactNode } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "../contexts";
import {
  initClientAndMedia,
  checkRoomSetting,
  listenClientDeviceChange,
  listenGlobalDeviceChange
} from "../actions";
import ErrorDetail from "../components/error-detail";

interface Props {
  children: ReactNode;
}
const Bootstrap: FunctionComponent<Props> = ({ children }) => {
  const store = useContext(StoreContext);

  useEffect(() => checkRoomSetting(store));
  useEffect(() => listenClientDeviceChange(store));
  useEffect(() => listenGlobalDeviceChange(store));
  useEffect(() => {
    // do not return async
    initClientAndMedia(store);
  });

  const { ui, client } = store;
  return (
    <div css={wrapperStyle}>
      <Observer>
        {() => {
          if (ui.error instanceof Error) {
            return <ErrorDetail error={ui.error} />;
          }

          if (!client.isReady) {
            return (
              <img css={loaderStyle} src="./images/conf/icon-loading.svg" />
            );
          }

          return <>{children}</>;
        }}
      </Observer>
    </div>
  );
};

export default Bootstrap;

const wrapperStyle = css({
  height: "100vh",
  position: "relative"
});

const loaderStyle = css({
  position: "absolute",
  margin: "auto",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});
