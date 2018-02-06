import React from 'react';

import Screen from './container/screen';
import MemberList from './container/member-list';
import Setting from './container/setting';
import Invite from './container/invite';

const ConfApp = () => (
  <React.Fragment>
    <main className="L-Main">
      <Screen />
      <MemberList />
    </main>
    <Setting />
    <Invite />
    <div className="L-RightSide">右メニュー</div>
  </React.Fragment>
);

export default ConfApp;
