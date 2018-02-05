import React from 'react';
import { observer } from 'mobx-react';

const NameEdit = () => (
  <div className="NameEdit">
    <div>表示名</div>
    <input className="NameEdit_Input" type="text" />
  </div>
);

export default observer(NameEdit);
