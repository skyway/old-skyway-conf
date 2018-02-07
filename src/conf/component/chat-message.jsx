import React from 'react';
import { observer } from 'mobx-react';

const ChatMessage = ({ msg }) => (
  <div className="ChatMessage">
    <img src={msg.thumb} />
    <div>
      <p>{msg.name}</p>
      <p>{msg.text}</p>
      <div>{msg.timestamp}</div>
    </div>
  </div>
);

export default observer(ChatMessage);
