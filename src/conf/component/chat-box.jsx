import React from 'react';
import { observer } from 'mobx-react';

import ChatMessage from './chat-message';

const ChatBox = ({ chat, action }) => (
  <div className="ChatBox">
    <div
      className="ChatBox_Closer"
      onClick={() => action.$update('ui.isChatOpen', false)}
    />
    <ul className="ChatBox_MessageList">
      {chat.messages.map(msg => (
        <li key={msg.id}>
          <ChatMessage msg={msg} />
        </li>
      ))}
    </ul>
    <div className="ChatBox_Input">
      <input
        type="text"
        value={chat.bufferText}
        onChange={ev => action.$update('chat.bufferText', ev.target.value)}
        onKeyDown={ev => ev.keyCode === 13 && action.onChatEnterKeyDown()}
      />
    </div>
  </div>
);

export default observer(ChatBox);
