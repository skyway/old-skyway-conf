import { decorate, observable } from 'mobx';

class NotificationStore {
  constructor() {
    this.items = [];
  }

  showStat(text) {
    this._show({ type: 'stat', text }, 2000);
  }

  showChat(syncState) {
    this._show(
      { type: 'chat', text: `${syncState.dispName} sent a chat` },
      3000
    );
  }

  showJoin(syncState) {
    this._show({ type: 'user', text: `${syncState.dispName} joined` });
  }

  showLeave(syncState) {
    this._show({ type: 'user', text: `${syncState.dispName} left` });
  }

  _show({ type, text }, time = 1000) {
    const item = {
      id: Date.now(),
      type,
      text,
    };
    this.items.push(item);
    setTimeout(() => this.items.remove(item), time);
  }
}

decorate(NotificationStore, {
  items: observable.shallow,
});
export default NotificationStore;
