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
    this.show(
      {
        id: Date.now(),
        type: "info",
        text
      },
      1000
    );
  }

  showJoin(name: string) {
    this.show(
      {
        id: Date.now(),
        type: "person",
        text: `${name} joined`
      },
      2000
    );
  }

  showLeave(name: string) {
    this.show(
      {
        id: Date.now(),
        type: "person",
        text: `${name} left`
      },
      2000
    );
  }

  private show(item: NotificationItem, time: number) {
    this.items.push(item);
    setTimeout(() => this.items.remove(item), time);
  }
}
decorate(NotificationStore, {
  // @ts-ignore: to use private accessor
  items: observable.shallow,
  showInfo: action,
  showJoin: action,
  showLeave: action,
  show: action
});

export default NotificationStore;
