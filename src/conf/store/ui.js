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
    if (
      window.OverconstrainedError &&
      err instanceof window.OverconstrainedError
    ) {
      this.isAppError = true;
    } else {
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
