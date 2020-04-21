import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import NotificationLayout from "../components/notification-layout";
import Toast from "../components/toast";

const Notification: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { notification } = store;
  return (
    <Observer>
      {() => (
        <NotificationLayout>
          {notification.items.slice().map((item) => (
            <Toast key={item.id} {...item} />
          ))}
        </NotificationLayout>
      )}
    </Observer>
  );
};

export default Notification;
