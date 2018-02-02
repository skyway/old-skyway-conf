import UiStore from './ui';
import SelfStore from './self';
import RoomStore from './room';

class ConfStore {
  constructor({ roomType, roomName }) {
    this.ui = new UiStore({ roomType, roomName });
    this.self = new SelfStore();
    this.room = new RoomStore();
  }
}

export default ConfStore;
