import { decorate, observable, action } from "mobx";
import { IObservableArray } from "mobx";
import { NotificationItem, NotificationInfo } from "../utils/types";

class NotificationStore {
  items: IObservableArray<NotificationItem>;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.items = [];
  }

  show() {
    const item: NotificationInfo = {
      id: Date.now(),
      type: "info",
      text: "Welcome"
    };
    this.items.push(item);
    setTimeout(() => this.items.remove(item), 30000);
  }
}
decorate(NotificationStore, {
  items: observable.shallow,
  show: action
});

export default NotificationStore;
