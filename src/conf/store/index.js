import UiStore from './ui';
import DeviceStore from './device';
import RoomStore from './room';

class ConfStore {
  constructor({ roomType, roomName }) {
    this.ui = new UiStore({ roomType, roomName });
    this.device = new DeviceStore();
    this.room = new RoomStore();
  }
}

export default ConfStore;
