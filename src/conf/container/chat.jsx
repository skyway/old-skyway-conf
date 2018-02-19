import React from 'react';
import { observer, inject } from 'mobx-react';

const Chat = ({ ui, action }) =>
  !ui.isChatOpen && (
    <button onClick={() => action.$update('ui.isChatOpen', true)}>
      <i className="material-icons">chat</i>
    </button>
  );

export default inject('ui', 'action')(observer(Chat));
