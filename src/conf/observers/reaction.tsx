import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import ReactionLayout from "../components/reaction-layout";
import { toggleReaction, sendReaction } from "../effects/reaction";

export const ReactionOpener: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickToggleReaction = useCallback(toggleReaction(store), [store]);
  const onClickSendReaction = useCallback(sendReaction(store), [store]);
  const { ui } = store;

  return (
    <Observer>
      {() => (
        <>
          <IconButton name="insert_emoticon" onClick={onClickToggleReaction} />
          {ui.isReactionOpen ? (
            <ReactionLayout onClickSend={onClickSendReaction} />
          ) : null}
        </>
      )}
    </Observer>
  );
};
