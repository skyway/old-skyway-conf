import { decorate, observable, action } from "mobx";
import { IObservableArray } from "mobx";
import { NotificationItem, NotificationType } from "../utils/types";

class NotificationStore {
  items: IObservableArray<NotificationItem>;

  constructor() {
    // @ts-ignore: to type IObservableArray
    this.items = [];
  }

  showInfo(text: string) {
    this.show("info", text);
  }

  showChat(from: string, text: string) {
    this.show("chat", `${from}: ${text}`);
  }

  showReaction(from: string, reaction: string) {
    this.show("insert_emoticon", `${from}: ${reaction}`);
  }

  showJoin(name: string) {
    this.show("person", `${name} joined`);
  }

  showLeave(name: string) {
    this.show("person", `${name} left`);
  }

  private show(type: NotificationType, text: string) {
    const item: NotificationItem = { id: Math.random(), type, text };
    this.items.push(item);
    setTimeout(() => this.items.remove(item), 4000);
  }
}
decorate(NotificationStore, {
  // @ts-ignore: to use private accessor
  items: observable.shallow,
  showInfo: action,
  showChat: action,
  showReaction: action,
  showJoin: action,
  showLeave: action,
  show: action
});

export default NotificationStore;
