import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent, ReactNode } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import {
  checkRoomSetting,
  ensureAudioDevice,
  listenStoreChanges,
  listenGlobalEvents,
  loadClient
} from "../effects/bootstrap";
import ErrorDetail from "../components/error-detail";
import Loader from "../components/loader";

interface Props {
  children: ReactNode;
}
const Bootstrap: FunctionComponent<Props> = ({ children }: Props) => {
  const store = useContext(StoreContext);

  useEffect(checkRoomSetting(store), [store]);
  useEffect(ensureAudioDevice(store), [store]);
  useEffect(listenStoreChanges(store), [store]);
  useEffect(listenGlobalEvents(store), [store]);
  useEffect(loadClient(store), [store]);

  const { ui, client, media } = store;
  return (
    <Observer>
      {() => {
        if (ui.error instanceof Error) {
          return <ErrorDetail error={ui.error} />;
        }

        if (!(client.isReady && media.isUserAudioEnabled)) {
          return <Loader />;
        }

        return <>{children}</>;
      }}
    </Observer>
  );
};

export default Bootstrap;
