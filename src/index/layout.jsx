import React from 'react';

import Title from './component/title';
import Form from './container/form';
import Desc from './component/desc';
import Copyright from './component/copyright';

const Layout = () => (
  <React.Fragment>
    <main className="L-Main">
      <Title />

      <div className="L-Form">
        <Form />
      </div>

      <Desc />
    </main>

    <div className="L-Copyright">
      <Copyright />
    </div>
  </React.Fragment>
);

export default Layout;
