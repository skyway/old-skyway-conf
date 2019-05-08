import { decorate, observable, action } from "mobx";
import { IObservableArray } from "mobx";
import { NotificationItem } from "../utils/types";

class NotificationStore {
  items: IObservableArray<NotificationItem>;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.items = [];
  }

  showInfo(text: string) {
    this.show({
      id: Date.now(),
      type: "info",
      text
    });
  }

  private show(item: NotificationItem) {
    this.items.push(item);
    setTimeout(() => this.items.remove(item), 30000);
  }
}
decorate(NotificationStore, {
  // @ts-ignore: to use private accessor
  items: observable.shallow,
  showInfo: action,
  show: action
});

export default NotificationStore;
