import { extendObservable } from 'mobx';

class NotificationStore {
  constructor() {
    extendObservable(
      this,
      {
        items: [],
      },
      {},
      { deep: false }
    );
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

export default NotificationStore;
