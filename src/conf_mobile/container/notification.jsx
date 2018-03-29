import React from 'react';
import { observer, inject } from 'mobx-react';

import Toast from '../component/toast';

const Notification = ({ notification }) => (
  <div className="L-Notification">
    <Toast notification={notification} />
  </div>
);

export default inject('notification')(observer(Notification));
