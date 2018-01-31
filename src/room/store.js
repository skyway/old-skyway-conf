import UiStore from './store/ui';

class RoomStore {
  constructor({ roomType, roomName }) {
    this.uiStore = new UiStore({ roomType, roomName });
  }
}

export default RoomStore;
