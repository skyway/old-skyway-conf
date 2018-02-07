import { extendObservable } from 'mobx';

class UiStore {
  constructor({ roomType, roomName }) {
    extendObservable(this, {
      roomType,
      roomName,
      isSettingOpen: false, // TODO: debug
      isInviteOpen: false,
      isChatOpen: true,
      isRoomJoin: false,
      hasError: null,
      get confUrl() {
        const hash = `#!/${this.roomType}/${this.roomName}`;
        return `${location.origin}${location.pathname}${hash}`;
      },
    });
  }
}

export default UiStore;
