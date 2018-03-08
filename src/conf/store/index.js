import UiStore from './ui';
import UserStore from './user';
import RoomStore from './room';
import ChatStore from './chat';
import NotificationStore from './notification';

class ConfStore {
  constructor() {
    this.ui = new UiStore();
    this.user = new UserStore();
    this.room = new RoomStore();
    this.chat = new ChatStore();
    this.notification = new NotificationStore();
  }
}

export default ConfStore;
