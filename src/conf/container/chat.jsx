import React from 'react';
import { observer, inject } from 'mobx-react';

import ChatBox from '../component/chat-box';

const Chat = ({ ui, chat, action }) =>
  ui.isChatOpen ? (
    <ChatBox chat={chat} action={action} />
  ) : (
    <button onClick={() => action.$update('ui.isChatOpen', true)}>Open</button>
  );

export default inject('ui', 'chat', 'action')(observer(Chat));
