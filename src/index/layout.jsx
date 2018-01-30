import React from 'react';

import Title from './component/title';
import Form from './component/form';
import Desc from './component/desc';
import Copyright from './component/copyright';

const Layout = ({
  store,
  action,
}) => (
  <React.Fragment>
    <main className="L-Main">
      <Title />

      <div className="L-Form">
        <Form
          form={store.formStore}
          ui={store.uiStore}
          onSubmit={action.onSubmitForm}
        />
      </div>

      <Desc />
    </main>

    <div className="L-Copyright">
      <Copyright />
    </div>
  </React.Fragment>
);

export default Layout;
