import UiStore from './ui';
import PeerStore from './peer';

class RoomStore {
  constructor({ roomType, roomName }) {
    this.ui = new UiStore({ roomType, roomName });
    this.peer = new PeerStore();
  }
}

export default RoomStore;
