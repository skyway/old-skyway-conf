import React from 'react';
import { observer } from 'mobx-react';

const Toast = ({ notification }) => (
  <React.Fragment>
    {notification.items.map(item => (
      <div className={`Toast -${item.type}`} key={item.id}>
        {item.text}
      </div>
    ))}
  </React.Fragment>
);

export default observer(Toast);
