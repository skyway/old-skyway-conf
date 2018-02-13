import UiStore from './ui';
import UserStore from './user';
import RoomStore from './room';
import ChatStore from './chat';

class ConfStore {
  constructor() {
    this.ui = new UiStore();
    this.user = new UserStore();
    this.room = new RoomStore();
    this.chat = new ChatStore();
  }
}

export default ConfStore;
