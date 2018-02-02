import React from 'react';
import { observer, inject } from 'mobx-react';

import FormMain from '../component/form-main';
import FormTypeSelector from '../component/form-type-selector';

const Form = ({ form, ui, action }) => (
  <div className="L-Form">
    <FormMain form={form} ui={ui} action={action} />
    <FormTypeSelector form={form} action={action} />
  </div>
);

export default inject('form', 'ui', 'action')(observer(Form));
