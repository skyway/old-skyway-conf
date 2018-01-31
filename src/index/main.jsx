import React from 'react';
import ReactDOM from 'react-dom';

import IndexStore from './store';
import IndexAction from './action';
import Layout from './layout';

const store = new IndexStore();
const action = new IndexAction(store);

ReactDOM.render(
  <Layout store={store} action={action} />,
  document.getElementById('app-root')
);
