import React from 'react';

import Prepare from './component/prepare';

const Layout = ({ store }) => (
  <React.Fragment>
    <main className="L-Main">
      <Prepare peer={store.peerStore} />
    </main>
  </React.Fragment>
);

export default Layout;
