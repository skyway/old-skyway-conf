import React from 'react';

import Root from './container/root';
import Form from './container/form';
import Title from './component/title';
import Desc from './component/desc';
import Copyright from './component/copyright';

const IndexApp = () => (
  <Root>
    <main className="L-Main">
      <Title />
      <Form />
      <Desc />
    </main>
    <div className="L-Copyright">
      <Copyright />
    </div>
  </Root>
);

export default IndexApp;
