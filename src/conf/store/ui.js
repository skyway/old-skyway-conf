import { extendObservable } from 'mobx';

class UiStore {
  constructor({ roomType, roomName }) {
    extendObservable(this, {
      roomType,
      roomName,
      isSettingOpen: true,
      isInviteOpen: false,
      isChatOpen: false,
      isRoomJoin: false,
      get confUrl() {
        const hash = `#!/${this.roomType}/${this.roomName}`;
        return `${location.origin}${location.pathname}${hash}`;
      },
    });
  }
}

export default UiStore;
