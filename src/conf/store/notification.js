import { decorate, observable } from 'mobx';

class NotificationStore {
  constructor() {
    this.items = [];
  }

  showChat(syncState) {
    this._show(`${syncState.dispName} sent a chat`);
  }

  showJoin(syncState) {
    this._show(`${syncState.dispName} joined`);
  }

  showLeave(syncState) {
    this._show(`${syncState.dispName} left`);
  }

  _show(text) {
    const item = {
      id: Date.now(),
      text,
    };
    this.items.push(item);
    setTimeout(() => this.items.remove(item), 1000);
  }
}

decorate(NotificationStore, {
  items: observable.shallow,
});
export default NotificationStore;
