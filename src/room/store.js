import UiStore from './store/ui';
import PeerStore from './store/peer';

class RoomStore {
  constructor({ roomType, roomName }) {
    this.uiStore = new UiStore({ roomType, roomName });
    this.peerStore = new PeerStore();
  }
}

export default RoomStore;
