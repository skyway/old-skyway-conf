import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";

const Notification: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { room } = store;
  room;
  return <Observer>{() => <div>HI</div>}</Observer>;
};

export default Notification;
