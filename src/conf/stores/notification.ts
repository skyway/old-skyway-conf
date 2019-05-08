import { decorate, observable, action } from "mobx";
import { IObservableArray } from "mobx";
import { NotificationItem } from "../utils/types";

class NotificationStore {
  items: IObservableArray<NotificationItem>;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.items = [];
  }

  show() {
    const item = {
      id: Date.now(),
      type: "announcement",
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
