import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';
import ChatBox from '../component/chat-box';

const ChatBoxWrapper = ({ ui, chat, action }) => (
  <Popup isVisible={ui.isChatOpen}>
    <ChatBox ui={ui} chat={chat} action={action} />
  </Popup>
);

export default inject('ui', 'chat', 'action')(observer(ChatBoxWrapper));
