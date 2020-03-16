import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import { exitRoom } from "../effects/exit";

export const ExitOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickExitRoom = useCallback(exitRoom(), [store]);

  return (
    <Observer>
      {() => <IconButton name="exit_to_app" onClick={onClickExitRoom} />}
    </Observer>
  );
};
