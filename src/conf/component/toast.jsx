import React from 'react';
import { observer } from 'mobx-react';

const Toast = ({ notification }) => (
  <React.Fragment>
    {notification.items.map(item => (
      <div className={`Toast -${item.type}`} key={item.id}>
        <span className="Toast_Text">{item.text}</span>
      </div>
    ))}
  </React.Fragment>
);

export default observer(Toast);
