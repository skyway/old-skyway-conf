import * as React from "react";
import { useContext, useEffect } from "react";
import { FunctionComponent, ReactNode } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import {
  checkRoomSetting,
  initAudioDeviceAndClient,
  listenStoreChanges,
  listenGlobalEvents,
} from "../effects/bootstrap";
import ErrorDetail from "../components/error-detail";
import Loader from "../components/loader";

interface Props {
  children: ReactNode;
}
const Bootstrap: FunctionComponent<Props> = ({ children }: Props) => {
  const store = useContext(StoreContext);

  useEffect(checkRoomSetting(store), [store]);
  useEffect(initAudioDeviceAndClient(store), [store]);
  useEffect(listenStoreChanges(store), [store]);
  useEffect(listenGlobalEvents(store), [store]);

  const { ui, client, room, media } = store;
  return (
    <Observer>
      {() => {
        if (ui.error !== null) {
          return <ErrorDetail error={ui.error} />;
        }

        if (!(client.isReady && room.isReady && media.isAudioEnabled)) {
          return <Loader />;
        }

        return <>{children}</>;
      }}
    </Observer>
  );
};

export default Bootstrap;
