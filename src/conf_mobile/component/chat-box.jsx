import React from 'react';
import { observer } from 'mobx-react';

import ChatMessageList from './chat-message-list';

const ChatBox = ({ chat, action }) => (
  <div className="ChatBox">
    <a
      className="ChatBox_Closer"
      onClick={() => action.$update('ui.isChatOpen', false)}
    >
      <i className="material-icons -x05">keyboard_arrow_right</i>
    </a>
    <ChatMessageList chat={chat} />
    <input
      className="ChatBox_Input"
      type="text"
      placeholder="Type messages here..."
      value={chat.bufferText}
      onChange={ev => action.$update('chat.bufferText', ev.target.value)}
      onKeyDown={ev => ev.keyCode === 13 && action.onChatEnterKeyDown()}
    />
  </div>
);

export default observer(ChatBox);
