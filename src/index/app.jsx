import React from 'react';

import Title from './component/title';
import Form from './container/form';
import Desc from './component/desc';
import Copyright from './component/copyright';

const IndexApp = () => (
  <React.Fragment>
    <main className="L-Main">
      <Title />
      <Form />
      <Desc />
    </main>
    <div className="L-Copyright">
      <Copyright />
    </div>
  </React.Fragment>
);

export default IndexApp;
