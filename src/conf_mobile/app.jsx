import React from 'react';

import Root from './container/root';
import Screen from './container/screen';
import MemberList from './container/member-list';
import Setting from './container/setting';
import ChatBox from './container/chat-box';

const ConfApp = () => (
  <Root>
    <main className="L-Main">
      <div className="">
        <Screen />
        <MemberList />
      </div>
      <div className="">
        <ChatBox />
      </div>
      <div className="L-Tab">
        <div>Room</div>
        <div>Chat</div>
      </div>
    </main>
    <Setting />
  </Root>
);

export default ConfApp;
