import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";

export const ChatOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { ui } = store;
  return (
    <Observer>
      {() => <IconButton name="chat" onClick={() => console.warn(ui)} />}
    </Observer>
  );
};
