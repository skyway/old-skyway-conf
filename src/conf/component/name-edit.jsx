import React from 'react';
import { observer } from 'mobx-react';

const NameEdit = ({ user, action }) => (
  <div className="NameEdit">
    <div>表示名</div>
    <input
      className="NameEdit_Input"
      type="text"
      value={user.dispName}
      onChange={ev => action.$update('user.dispName', ev.target.value)}
    />
  </div>
);

export default observer(NameEdit);
