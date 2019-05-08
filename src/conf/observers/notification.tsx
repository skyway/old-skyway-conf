import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { Icon } from "../components/icon";

const Notification: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { notification } = store;
  return (
    <Observer>
      {() => (
        <>
          {notification.items.slice().map(item => (
            <div key={item.id}>
              <Icon name={item.type} />
              <span>{item.text}</span>
            </div>
          ))}
        </>
      )}
    </Observer>
  );
};

export default Notification;
