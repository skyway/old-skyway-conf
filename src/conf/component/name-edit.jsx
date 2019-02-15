import React from 'react';
import { observer } from 'mobx-react';

const NameEdit = ({ user, action }) => (
  <div className="NameEdit">
    <div className="NameEdit_Label">Name</div>
    <input
      className="NameEdit_Input"
      type="text"
      value={user.dispName}
      onChange={ev => {
        const { value } = ev.target;
        // check manually because maxLength can't prevent event while IME compositing
        if (value.length <= 10) {
          action.$update('user.dispName', value);
        }
      }}
    />
  </div>
);

export default observer(NameEdit);
