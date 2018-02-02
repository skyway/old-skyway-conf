import UiStore from './ui';
import SelfStore from './self';

class ConfStore {
  constructor({ roomType, roomName }) {
    this.ui = new UiStore({ roomType, roomName });
    this.self = new SelfStore();
  }
}

export default ConfStore;
