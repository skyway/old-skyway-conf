import React from 'react';
import { observer } from 'mobx-react';

import ChatMessageList from './chat-message-list';

const ChatBox = ({ chat, action }) => (
  <div className="ChatBox">
    <button
      className="ChatBox_Closer"
      onClick={() => action.$update('ui.isChatOpen', false)}
    >
      <i className="material-icons -x05">close</i>
    </button>
    <ChatMessageList chat={chat} />
    <div className="ChatBox_Action">
      <input
        className="ChatBox_Action_Input"
        type="text"
        placeholder="Type messages here..."
        value={chat.bufferText}
        onChange={ev => action.$update('chat.bufferText', ev.target.value)}
      />
      <button
        disabled={chat.bufferText.length === 0}
        onClick={() => action.onClickSendChat()}
      >
        Send
      </button>
    </div>
  </div>
);

export default observer(ChatBox);
