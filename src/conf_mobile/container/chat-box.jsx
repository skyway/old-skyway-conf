import React from 'react';
import { observer, inject } from 'mobx-react';

import ChatBox from '../component/chat-box';

const ChatBoxWrapper = ({ ui, chat, action }) => (
  <div className="L-ChatBox">
    {ui.isChatOpen && <ChatBox ui={ui} chat={chat} action={action} />}
  </div>
);

export default inject('ui', 'chat', 'action')(observer(ChatBoxWrapper));
