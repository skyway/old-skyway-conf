import React from 'react';
import { observer } from 'mobx-react';

const ChatBox = ({ chat, action }) => (
  <div className="ChatBox">
    <div
      className="ChatBox_Closer"
      onClick={() => action.$update('ui.isChatOpen', false)}
    />
    <div className="ChatBox_MessageList">
      <ul>
        {chat.messages.map(msg => (
          <li key={msg.id}>
            <div>
              <img />
              <div>
                <p>{msg.name}</p>
                <p>{msg.text}</p>
                <div>{msg.timestamp}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="ChatBox_Input">
      <input
        type="text"
        value={chat.tempMsg}
        onChange={ev => action.$update('chat.tempMsg', ev.target.value)}
        onKeyDown={ev => ev.keyCode === 13 && action.onChatEnterKeyDown()}
      />
    </div>
  </div>
);

export default observer(ChatBox);
