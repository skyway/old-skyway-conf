import React from 'react';
import { observer } from 'mobx-react';

const FormTypeSelector = ({ form, action }) => (
  <div className="FormTypeSelector">
    <label className="FormTypeSelector_Item">
      <input
        type="radio"
        name="type"
        value="mesh"
        onChange={() => action.$update('form.type', 'mesh')}
        checked={form.type === 'mesh'}
      />
      <span className="FormTypeSelector_Item_Text">Mesh</span>
    </label>
    <label className="FormTypeSelector_Item">
      <input
        type="radio"
        name="type"
        value="sfu"
        onChange={() => action.$update('form.type', 'sfu')}
        checked={form.type === 'sfu'}
      />
      <span className="FormTypeSelector_Item_Text">SFU</span>
    </label>
  </div>
);

export default observer(FormTypeSelector);
