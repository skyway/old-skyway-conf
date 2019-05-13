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
      id: Math.random(),
      type: "info",
      text
    });
  }

  showChat(from: string, text: string) {
    this.show({
      id: Math.random(),
      type: "chat",
      text: `${from}: ${text}`
    });
  }

  showJoin(name: string) {
    this.show({
      id: Math.random(),
      type: "person",
      text: `${name} joined`
    });
  }

  showLeave(name: string) {
    this.show({
      id: Math.random(),
      type: "person",
      text: `${name} left`
    });
  }

  private show(item: NotificationItem) {
    this.items.push(item);
    setTimeout(() => this.items.remove(item), 4000);
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
