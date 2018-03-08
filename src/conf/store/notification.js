import { extendObservable, observable } from 'mobx';

class NotificationStore {
  constructor() {
    extendObservable(this, {
      items: observable.shallowArray([]),
      _reserve: new Set(),
    });
  }

  showChat(syncState) {
    this._show(`${syncState.dispName} sent a chat`);
  }

  reserveJoin(peerId) {
    this._reserve.add(peerId);
  }

  showJoinIfReserved(peerId, syncState) {
    if (this._reserve.has(peerId)) {
      this._show(`${syncState.dispName} joined`);
      this._reserve.delete(peerId);
    }
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
