import React from 'react';
import { observer } from 'mobx-react';

const NameEdit = ({ ui, action }) => (
  <div className="NameEdit">
    <div>表示名</div>
    <input
      className="NameEdit_Input"
      type="text"
      value={ui.tempDispName}
      onChange={ev => action.$update('ui.tempDispName', ev.target.value)}
    />
  </div>
);

export default observer(NameEdit);
