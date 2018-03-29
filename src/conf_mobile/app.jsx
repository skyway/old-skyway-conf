import React from 'react';

import Root from './container/root';
import Screen from './container/screen';
import MemberList from './container/member-list';
import Setting from './container/setting';
import ChatBox from './container/chat-box';
import Welcome from './container/welcome';
import Notification from './container/notification';

const ConfApp = () => (
  <Root>
    <main className="L-Main">
      <Screen />
      <MemberList />
    </main>
    <Setting />
    <ChatBox />
    <Welcome />
    <Notification />
  </Root>
);

export default ConfApp;
