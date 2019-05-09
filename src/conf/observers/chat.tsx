import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import { openChat } from "../effects/chat";

export const ChatOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenChat = useCallback(openChat(store), [store]);

  return (
    <Observer>
      {() => <IconButton name="chat" onClick={onClickOpenChat} />}
    </Observer>
  );
};
