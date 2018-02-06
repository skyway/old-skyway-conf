import UiStore from './ui';
import UserStore from './user';
import RoomStore from './room';

class ConfStore {
  constructor({ roomType, roomName }) {
    this.ui = new UiStore({ roomType, roomName });
    this.user = new UserStore();
    this.room = new RoomStore();
  }
}

export default ConfStore;
