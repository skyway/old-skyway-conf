import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import ChatLayout from "../components/chat-layout";
import { openChat, closeChat, sendChat } from "../effects/chat";

export const ChatOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickOpenChat = useCallback(openChat(store), [store]);

  return (
    <Observer>
      {() => <IconButton name="chat" onClick={onClickOpenChat} />}
    </Observer>
  );
};

export const Chat: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickCloseChat = useCallback(closeChat(store), [store]);
  const onClickSendChat = useCallback(sendChat(store), [store]);

  const { ui, room } = store;
  return (
    <Observer>
      {() => {
        if (!ui.isChatOpen) {
          return <></>;
        }

        return (
          <ChatLayout
            chats={[...room.chats]}
            onClickCloser={onClickCloseChat}
            onClickSend={onClickSendChat}
          />
        );
      }}
    </Observer>
  );
};
