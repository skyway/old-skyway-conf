import { extendObservable } from 'mobx';

class UiStore {
  constructor({ roomType, roomName }) {
    extendObservable(this, {
      roomType,
      roomName,

      isAppReady: false,

      isSettingOpen: true,
      isInviteOpen: false,
      isChatOpen: false,
      isRoomJoin: false,

      isUserError: false,
      isAppError: false,

      get confUrl() {
        const hash = `#!/${this.roomType}/${this.roomName}`;
        return `${location.origin}${location.pathname}${hash}`;
      },
      get isError() {
        return this.isUserError || this.isAppError;
      },
    });
  }

  handleGetUserMediaError(err) {
    switch (err.name) {
      case 'OverconstrainedError':
      case 'NotFoundError':
        this.isAppError = true;
        break;
      default:
        this.isUserError = true;
    }
    console.error(err);
  }

  handleAppError(err) {
    this.isAppError = true;
    console.error(err);
  }

  handleUserError(err) {
    this.isUserError = true;
    console.error(err);
  }
}

export default UiStore;
